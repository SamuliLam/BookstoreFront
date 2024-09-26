import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useUserContext } from '../context/UserContext';
import SearchBar from "./SearchBar.jsx";
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import ThemeToggle from "./ThemeToggle.jsx";
import ShoppingCart from "./ShoppingCart.jsx";

const Header = () => {
    const { user } = useUserContext();

    console.log('Current user state:', user);

    return (
        <header className="header flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800 dark:shadow-white fixed w-full top-0">
            <Link to="/" className="text-2xl font-bold dark:text-white">Ink & Quill</Link>
                <SearchBar/>
            <div className="flex space-x-4 items-center">
                <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-white">
                    Home
                </Link>
                {user ? (
                    <>
                        <LogoutButton/>
                        <span className="text-sm text-gray-700 dark:text-white">
                            Welcome, {user.first_name || user.email.split('@')[0] || 'User'}!
                        </span>
                    </>
                ) : (
                    <>
                        <LoginButton/>
                        <SignupButton/>
                    </>
                )}
                <button className="text-blue-500 text-3xl hover:text-blue-700 dark:hover:text-blue-700 dark:text-white">
                        <ShoppingCart/>
                </button>
                <Link to="/profile">
                    <button className="text-blue-500 text-3xl hover:text-blue-700 dark:hover:text-blue-700 dark:text-white">
                        <FaUser/>
                    </button>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;