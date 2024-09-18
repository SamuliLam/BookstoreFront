import React, { useState, useEffect } from 'react';
import { User, Settings, Book, Mail, Edit3, Sparkle } from 'lucide-react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {updateUserProfile} from "../hooks/userProfile.js";

const ProfilePage = () => {
    const { user, login } = useUserContext();
    const [activeSection, setActiveSection] = useState('editProfile');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        street_number: '',
        street_name: '',
    });
    const [updateStatus, setUpdateStatus] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                street_number: user.street_number || '',
                street_name: user.street_name || '',
            });
        }
    }, [user, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateStatus('loading');

        const result = await updateUserProfile(user.id, formData, user.token);

        if (result.success) {
            setUpdateStatus('success');
            login(result.user);
        } else {
            setUpdateStatus('error');
            console.error(result.error);
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'editProfile':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="street_number" className="block text-sm font-medium text-gray-700">Street Number</label>
                                <input
                                    type="text"
                                    id="street_number"
                                    name="street_number"
                                    value={formData.street_number}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="street_name" className="block text-sm font-medium text-gray-700">Street Name</label>
                                <input
                                    type="text"
                                    id="street_name"
                                    name="street_name"
                                    value={formData.street_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                disabled={updateStatus === 'loading'}
                            >
                                {updateStatus === 'loading' ? 'Saving...' : 'Save Changes'}
                            </button>
                            {updateStatus === 'success' && (
                                <p className="text-green-600">Profile updated successfully!</p>
                            )}
                            {updateStatus === 'error' && (
                                <p className="text-red-600">Failed to update profile. Please try again.</p>
                            )}
                        </form>
                    </div>
                );
            case 'updateInfo':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New
                                    Password</label>
                                <input type="password" id="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full">Update Password</button>
                        </form>
                    </>
                );
            case 'orderHistory':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Order History</h2>
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
                        <h2 className="text-2xl font-bold mb-4">Favorite Books</h2>
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
            <div className="w-full md:w-64 bg-white shadow-lg p-6 flex flex-col">
                <div className="flex flex-col items-center mb-6">
                    <User size={64} className="text-gray-700 mb-3" />
                    <h1 className="text-xl font-bold mb-1">{user.first_name} {user.last_name}</h1>
                    <p className="text-sm text-gray-600 mb-4">{user.email}</p>
                </div>

                <div className="space-y-2 mb-6">
                    <button
                        onClick={() => setActiveSection('editProfile')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeSection === 'editProfile' ? 'bg-blue-100 text-blue-600' : 'bg-white hover:bg-gray-50'}`}
                    >
                        <Edit3 className="mr-2" size={18} />
                        <span>Edit Profile</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('updateInfo')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeSection === 'updateInfo' ? 'bg-green-100 text-green-600' : 'bg-white hover:bg-gray-50'}`}
                    >
                        <Settings className="mr-2" size={18} />
                        <span>Change Password</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('orderHistory')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeSection === 'orderHistory' ? 'bg-purple-100 text-purple-600' : 'bg-white hover:bg-gray-50'}`}
                    >
                        <Book className="mr-2" size={18} />
                        <span>Order History</span>
                    </button>
                    <button
                        onClick={() => setActiveSection('favoriteBooks')}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeSection === 'favoriteBooks' ? 'bg-orange-100 text-orange-600' : 'bg-white hover:bg-gray-50'}`}
                    >
                        <Sparkle className="mr-2" size={18} />
                        <span>Favorite Books</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;