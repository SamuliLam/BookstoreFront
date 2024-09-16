import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useUserContext } from '../context/UserContext';
import SearchBar from "./SearchBar.jsx";
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import ShoppingCart from "./ShoppingCart.jsx";

const Header = () => {
    const { user } = useUserContext();

    console.log('Current user state:', user);

    return (
        <header className="flex justify-between items-center p-4 shadow-md bg-white">
            <Link to="/" className="text-2xl font-bold">Ink & Quill</Link>
            <div>
                <SearchBar />
            </div>
            <div className="flex space-x-4 items-center">
                <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500">
                    Home
                </Link>
                {user ? (
                    <>
                        <LogoutButton />
                        <span className="text-sm text-gray-700">
                            Welcome, {user.first_name || user.email.split('@')[0] || 'User'}!
                        </span>
                    </>
                ) : (
                    <>
                        <LoginButton />
                        <SignupButton />
                    </>
                )}
                <button>
                    <ShoppingCart />
                </button>
                <button className="text-3xl hover:text-blue-500">
                    <FaUser />
                </button>
            </div>
        </header>
    );
};

export default Header;