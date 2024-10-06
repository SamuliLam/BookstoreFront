import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useUserContext } from '../context/UserContext';
import SearchBar from "./SearchBar.jsx";
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import ThemeToggle from "./ThemeToggle.jsx";
import ShoppingCart from "./ShoppingCart.jsx";
import HeaderAdminPanelButton from "./HeaderAdminPanelButton.jsx";

const Header = () => {
    const { user, getUser } = useUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 sticky w-full top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold dark:text-white">Ink & Quill</Link>
                    </div>
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <LogoutButton />
                                <span className="text-sm text-gray-700 dark:text-white">
                                    Welcome, {user.first_name || user.email.split('@')[0] || 'User'}!
                                </span>
                                {user.role === 'ADMIN' && <HeaderAdminPanelButton />}
                            </>
                        ) : (
                            <>
                                <LoginButton />
                                <SignupButton />
                            </>
                        )}
                        <ShoppingCart className="text-blue-500 text-2xl hover:text-blue-700 dark:hover:text-blue-700 dark:text-white" />
                        <Link to="/profile">
                            <FaUser className="text-blue-500 text-2xl hover:text-blue-700 dark:hover:text-blue-700 dark:text-white" />
                        </Link>
                        <ThemeToggle />
                    </div>
                    <div className="md:hidden flex items-center space-x-4">
                        <ShoppingCart className="text-blue-500 text-2xl hover:text-blue-700 dark:hover:text-blue-700 dark:text-white" />
                        <Link to="/profile">
                            <FaUser className="text-blue-500 text-2xl hover:text-blue-700 dark:hover:text-blue-700 dark:text-white" />
                        </Link>
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 dark:text-white hover:text-blue-500 focus:outline-none"
                        >
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
                    <div className="flex justify-end p-4">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 dark:text-white hover:text-blue-500 focus:outline-none"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col items-center space-y-4 mt-8">
                        <SearchBar />
                        {currentUser ? (
                            <>
                                <LogoutButton />
                                <span className="text-sm text-gray-700 dark:text-white">
                                    Welcome, {currentUser.first_name || currentUser.email.split('@')[0] || 'User'}!
                                </span>
                                {currentUser.role === 'ADMIN' && <HeaderAdminPanelButton />}
                            </>
                        ) : (
                            <>
                                <LoginButton />
                                <SignupButton />
                            </>
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;