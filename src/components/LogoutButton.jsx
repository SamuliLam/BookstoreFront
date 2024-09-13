import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
        >
            Logout
        </button>
    );
};

export default LogoutButton;