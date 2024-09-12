import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import SearchBar from "./SearchBar.jsx"; // Import icons from react-icons

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 shadow-md bg-white">
            <h1 className="text-2xl font-bold">BookFiddler</h1>
            <div>
                <SearchBar />
            </div>
            <div className="flex space-x-8">
                <button className="text-3xl hover:text-blue-500">
                    <FaShoppingCart />
                </button>
                <button className="text-3xl hover:text-blue-500">
                    <FaUser />
                </button>
            </div>
        </header>
    );
};

export default Header;
