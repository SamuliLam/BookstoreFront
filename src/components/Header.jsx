import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useUserContext } from '../context/UserContext';
import SearchBar from "./SearchBar.jsx";
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import ThemeToggle from "./ThemeToggle.jsx";
import ShoppingCart from "./ShoppingCart.jsx";

const Header = () => {
    const { user } = useUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md dark:shadow-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold dark:text-white">Ink & Quill</Link>
                    </div>
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-white">
                            Home
                        </Link>
                        {user ? (
                            <>
                                <LogoutButton />
                                <span className="text-sm text-gray-700 dark:text-white">
                                    Welcome, {user.first_name || user.email.split('@')[0] || 'User'}!
                                </span>
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
                    <div className="md:hidden flex items-center">
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
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3">
                        <div className="flex justify-center mb-4">
                            <SearchBar />
                        </div>
                        <div className="flex justify-center">
                            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500 dark:text-white">
                                Home
                            </Link>
                        </div>
                        {user ? (
                            <>
                                <div className="flex justify-center mb-2">
                                    <LogoutButton />
                                </div>
                                <div className="flex justify-center">
                                    <span className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-white">
                                        Welcome, {user.first_name || user.email.split('@')[0] || 'User'}!
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center mb-2">
                                    <LoginButton />
                                </div>
                                <div className="flex justify-center mb-2">
                                    <SignupButton />
                                </div>
                            </>
                        )}
                        <div className="flex justify-center mb-2">
                            <ShoppingCart className="text-blue-500 text-2xl hover:text-blue-700 dark:hover:text-blue-700 dark:text-white" />
                        </div>
                        <div className="flex justify-center mb-2">
                            <Link to="/profile">
                                <FaUser className="text-blue-500 text-2xl hover:text-blue-700 dark:hover:text-blue-700 dark:text-white" />
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;