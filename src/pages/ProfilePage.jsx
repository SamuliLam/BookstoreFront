import React, { useState, useEffect } from 'react';
import {
    User,
    Settings,
    Book,
    Edit3,
    Sparkle,
    CheckCircle,
    XCircle,
    ArrowDownNarrowWide,
    ArrowDownRight, MoveDown, PlusIcon, MinusIcon
} from 'lucide-react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { changeUserPassword, updateUserProfile, getUserOrders } from '../utils/userApiUtils';

/// TODO only use UserToken

const ProfilePage = () => {
    const { user, updateUser, getUser } = useUserContext();
    const [activeSection, setActiveSection] = useState('editProfile');
    const [updateStatus, setUpdateStatus] = useState(null);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const currentUser = getUser();
        if (!currentUser || !currentUser.user_id) {
            setUpdateStatus('Error: User information is missing. Please log in again.');
            return;
        }

        const formData = new FormData(e.target);
        const updatedUserData = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            street_name: formData.get('street_name'),
            street_number: formData.get('street_number') ? Number(formData.get('street_number')) : null,
        };

        setUpdateStatus('Updating...');

        const result = await updateUserProfile(currentUser.user_id, updatedUserData, currentUser.token);

        if (result.success) {
            updateUser(result.user);
            setUpdateStatus('Profile updated successfully!');
        } else {
            setUpdateStatus(`Failed to update profile: ${result.error}`);
        }

        setTimeout(() => setUpdateStatus(null), 5000);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const currentUser = getUser();
        if (!currentUser || !currentUser.user_id) {
            setUpdateStatus('Error: User information is missing. Please log in again.');
            return;
        }

        const formData = new FormData(e.target);
        const newPassword = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (newPassword !== confirmPassword) {
            setUpdateStatus('Error: Passwords do not match.');
            return;
        }

        setUpdateStatus('Updating password...');

        const result = await changeUserPassword(currentUser.user_id, newPassword, currentUser.token);

        if (result.success) {
            updateUser(result.user);
            setUpdateStatus('Password updated successfully!');
        } else {
            setUpdateStatus(`Failed to update password: ${result.error}`);
        }

        setTimeout(() => setUpdateStatus(null), 5000);
    };

    useEffect(() => {
        if (activeSection === 'orderHistory' && user) {
            fetchOrders();
        }
    }, [activeSection, user]);

    const fetchOrders = async () => {
        setOrderLoading(true);
        setOrderError(null);
        const currentUser = getUser();
        if (!currentUser || !currentUser.token) {
            setOrderError('User information is missing. Please log in again.');
            setOrderLoading(false);
            return;
        }

        const result = await getUserOrders(currentUser.token);
        if (result.success) {
            const formattedOrders = result.orders.map(order => ({
                id: order.order_id,
                date: new Date(order.orderDate).toLocaleDateString(),
                total: order.total,
                status: "SUCCESSFUL",
                orderItems: order.orderItems.map(item => ({
                    book: item.book,
                    quantity: item.quantity,
                    price: item.price
                }))
            }));
            setOrders(formattedOrders);
            setFilteredOrders(formattedOrders);
        } else {
            setOrderError(result.error);
        }
        setOrderLoading(false);
    };

    useEffect(() => {
        const results = orders.filter(order =>
            order.id.toString().includes(searchTerm) ||
            order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.total.toString().includes(searchTerm) ||
            order.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrders(results);
        setCurrentPage(1);
    }, [searchTerm, orders]);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderOrderDetails = (order) => {
        if (!order.orderItems) return null;

        return (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
                <ul className="space-y-1">
                    {order.orderItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center">
                        <span className="dark:text-gray-300">
                            {item.book.title} - Quantity: {item.quantity}
                        </span>
                            <span className="font-semibold dark:text-gray-200">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderContent = () => {
        const currentUser = getUser();
        if (!currentUser) return null;

        switch (activeSection) {
            case 'editProfile':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center dark:text-gray-100">
                            <Edit3 className="mr-2" size={24} />
                            Edit Profile
                        </h2>
                        <form className="space-y-6" onSubmit={handleProfileUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                    <input type="text" id="first_name" name="first_name" defaultValue={currentUser.first_name}
                                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                    <input type="text" id="last_name" name="last_name" defaultValue={currentUser.last_name}
                                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input type="email" id="email" name="email" defaultValue={currentUser.email}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="street_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street Name</label>
                                    <input type="text" id="street_name" name="street_name" defaultValue={currentUser.street_name}
                                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                                </div>
                                <div>
                                    <label htmlFor="street_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street Number</label>
                                    <input type="number" id="street_number" name="street_number" defaultValue={currentUser.street_number}
                                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                                </div>
                            </div>
                            <button type="submit"
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 dark:bg-blue-600 dark:hover:bg-blue-700">
                                Save Changes
                            </button>
                        </form>
                    </div>
                );
            case 'updateInfo':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center dark:text-gray-100">
                            <Settings className="mr-2" size={24} />
                            Change Password
                        </h2>
                        <form className="space-y-6" onSubmit={handlePasswordChange}>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                <input type="password" id="password" name="password" required
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 dark:bg-green-600 dark:hover:bg-green-700">
                                Update Password
                            </button>
                        </form>
                    </div>
                );
            case 'orderHistory':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center dark:text-gray-100">
                            <Book className="mr-2" size={24} />
                            Order History
                        </h2>
                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>
                        {orderLoading ? (
                            <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
                        ) : orderError ? (
                            <p className="text-red-500">{orderError}</p>
                        ) : (
                            <>
                                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Order
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Details</th>
                                        </tr>
                                        </thead>
                                        <tbody
                                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {currentOrders.map((order) => (
                                            <React.Fragment key={order.id}>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{order.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{order.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">${order.total.toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                                                        <button
                                                            onClick={() => toggleOrderDetails(order.id)}
                                                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 flex items-center"
                                                        >
                                                            {expandedOrderId === order.id ? (
                                                                <>
                                                                    <MinusIcon className="mr-1" size={16}/>
                                                                    Hide Details
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <PlusIcon className="mr-1" size={16}/>
                                                                    Show Details
                                                                </>
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>
                                                {expandedOrderId === order.id && (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-4 dark:bg-gray-700">
                                                            {renderOrderDetails(order)}
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        <Book size={16} className="mr-2"/>
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Page {currentPage} of {Math.ceil(filteredOrders.length / ordersPerPage)}
                                    </span>
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={indexOfLastOrder >= filteredOrders.length}
                                        className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        Next
                                        <Book size={16} className="ml-2"/>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                );
            case 'favoriteBooks':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center dark:text-gray-100">
                            <Sparkle className="mr-2" size={24}/>
                            Favorite Books
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                                <span className="font-medium dark:text-gray-300">The Great Gatsby</span>
                                <button
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300">
                                    Remove
                                </button>
                            </li>
                            <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                                <span className="font-medium dark:text-gray-300">To Kill a Mockingbird</span>
                                <button
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300">
                                    Remove
                                </button>
                            </li>
                        </ul>
                    </div>
                );
            default:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Welcome to Your Profile</h2>
                        <p className="text-gray-600 dark:text-gray-400">Select an option from the sidebar to get
                            started.</p>
                    </div>
                );
        }
    };

    if (!user) {
        return <div
            className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-gray-300">Loading...</div>;
    }


    return (
        <div className="flex flex-col md:flex-row w-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white shadow-xl p-6 flex flex-col dark:bg-gray-800 relative z-10">
                <div className="flex flex-col items-center mb-6">
                    <User size={64} className="text-gray-700 mb-3 dark:text-gray-300"/>
                    <h1 className="text-xl font-bold mb-1 dark:text-gray-100">{user.first_name} {user.last_name}</h1>
                    <p className="text-sm text-gray-600 mb-4 dark:text-gray-400">{user.email}</p>
                </div>


                {/* Action Buttons */}
                <div className="space-y-2 mb-6">
                    <button
                        onClick={() => setActiveSection('editProfile')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                            activeSection === 'editProfile'
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 shadow-md'
                                : 'bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        <Edit3 className="mr-2" size={18}/>
                        <span>Edit Profile</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('updateInfo')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                            activeSection === 'updateInfo'
                                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 shadow-md'
                                : 'bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        <Settings className="mr-2" size={18}/>
                        <span>Change Password</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('orderHistory')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                            activeSection === 'orderHistory'
                                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 shadow-md'
                                : 'bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        <Book className="mr-2" size={18}/>
                        <span>Order History</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('favoriteBooks')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                            activeSection === 'favoriteBooks'
                                ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 shadow-md'
                                : 'bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        <Sparkle className="mr-2" size={18}/>
                        <span>Favorite Books</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-auto dark:bg-gray-900">
                <div className="bg-white rounded-lg shadow-xl p-6 dark:bg-gray-800">
                    {renderContent()}
                </div>
                {/* Status message */}
                {updateStatus && (
                    <div className={`mt-4 p-4 rounded-lg shadow-md ${
                        updateStatus.includes('successfully') ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    } flex items-center`}>
                        {updateStatus.includes('successfully') ? (
                            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                        ) : (
                            <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                        )}
                        <p>{updateStatus}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;