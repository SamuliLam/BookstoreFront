import React, { useState, useEffect } from 'react';
import { User, Settings, Book, Mail, Edit3, Sparkle } from 'lucide-react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {changeUserPassword, updateUserProfile} from '../utils/userApiUtils';

const ProfilePage = () => {
    const { user, updateUser, getUser } = useUserContext();
    const [activeSection, setActiveSection] = useState('editProfile');
    const [updateStatus, setUpdateStatus] = useState(null);
    const navigate = useNavigate();

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

    const renderContent = () => {
        const currentUser = getUser();
        if (!currentUser) return null;

        switch (activeSection) {
            case 'editProfile':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Edit Profile</h2>
                        <form className="space-y-4" onSubmit={handleProfileUpdate}>
                            <div>
                                <label htmlFor="first_name"
                                       className="block text-sm font-medium text-gray-700 dark:text-white">First
                                    Name</label>
                                <input type="text" id="first_name" name="first_name"
                                       defaultValue={currentUser.first_name}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
                            </div>
                            <div>
                                <label htmlFor="last_name"
                                       className="block text-sm font-medium text-gray-700 dark:text-white">Last
                                    Name</label>
                                <input type="text" id="last_name" name="last_name" defaultValue={currentUser.last_name}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
                                <input type="email" id="email" name="email" defaultValue={currentUser.email}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
                            </div>
                            <div>
                                <label htmlFor="street_name"
                                       className="block text-sm font-medium text-gray-700 dark:text-white">Street
                                    Name</label>
                                <input type="street_name" id="street_name" name="street_name"
                                       defaultValue={currentUser.street_name}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
                            </div>
                            <div>
                                <label htmlFor="street_number"
                                       className="block text-sm font-medium text-gray-700 dark:text-white">Street
                                    Number</label>
                                <input type="street_number" id="street_number" name="street_number"
                                       defaultValue={currentUser.phone_number}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
                            </div>
                            <button type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Save Changes
                            </button>
                            {updateStatus && (
                                <div
                                    className={`mt-2 text-sm ${updateStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                                    {updateStatus}
                                </div>
                            )}
                        </form>
                    </div>
                );
            case 'updateInfo':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Change Password</h2>
                        <form className="space-y-4" onSubmit={handlePasswordChange}>
                            <div>
                                <label htmlFor="password"
                                       className="block text-sm font-medium text-gray-700 dark:text-white">New Password</label>
                                <input type="password" id="password" name="password" required
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Confirm New Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full">Update Password</button>
                            {updateStatus && (
                                <div className={`mt-2 text-sm ${updateStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                                    {updateStatus}
                                </div>
                            )}
                        </form>
                    </>
                );
            case 'orderHistory':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Order History</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">#12345</td>
                                    <td className="px-6 py-4 whitespace-nowrap">2023-09-15</td>
                                    <td className="px-6 py-4 whitespace-nowrap">$59.99</td>
                                    <td className="px-6 py-4 whitespace-nowrap">Delivered</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                );
            case 'favoriteBooks':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Favorite Books</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-between p-2 bg-gray-50 rounded-lg shadow">
                                <span>The Great Gatsby</span>
                                <button className="text-red-500 hover:text-red-700">Remove</button>
                            </li>
                            <li className="flex items-center justify-between p-2 bg-gray-50 rounded-lg shadow">
                                <span>To Kill a Mockingbird</span>
                                <button className="text-red-500 hover:text-red-700">Remove</button>
                            </li>
                        </ul>
                    </>
                );
            default:
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Welcome to Your Profile</h2>
                        <p>Select an option from the left to get started.</p>
                    </>
                );
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row w-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white shadow-lg p-6 flex flex-col dark:bg-blue-950">
                <div className="flex flex-col items-center mb-6">
                    <User size={64} className="text-gray-700 mb-3 dark:text-white" />
                    <h1 className="text-xl font-bold mb-1 dark:text-white">{user.first_name} {user.last_name}</h1>
                    <p className="text-sm text-gray-600 mb-4 dark:text-white">{user.email}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mb-6">
                    <button
                        onClick={() => setActiveSection('editProfile')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeSection === 'editProfile' ? 'bg-blue-100 text-blue-600' : 'bg-white hover:bg-gray-50 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-950'}`}
                    >
                        <Edit3 className="mr-2" size={18} />
                        <span>Edit Profile</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('updateInfo')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeSection === 'updateInfo' ? 'bg-green-100 text-green-600' : 'bg-white hover:bg-gray-50 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-950'}`}
                    >
                        <Settings className="mr-2" size={18} />
                        <span>Change Password</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('orderHistory')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeSection === 'orderHistory' ? 'bg-purple-100 text-purple-600' : 'bg-white hover:bg-gray-50 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-950'}`}
                    >
                        <Book className="mr-2" size={18} />
                        <span>Order History</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('favoriteBooks')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeSection === 'favoriteBooks' ? 'bg-orange-100 text-orange-600' : 'bg-white hover:bg-gray-50 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-950'}`}
                    >
                        <Sparkle className="mr-2" size={18} />
                        <span>Favorite Books</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-auto dark:bg-black">
                <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-700 vw-[30]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;