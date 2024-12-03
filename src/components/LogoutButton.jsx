import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const LogoutButton = () => {
    const { t } = useTranslation();

    const { logout } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="logout-button px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
            id="logout-button"
        >
            {t("LogoutButtonButtonText")}
        </button>
    );
};

export default LogoutButton;