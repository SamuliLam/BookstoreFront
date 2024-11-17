import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

const HeaderAdminPanelButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin');
    };

    return (
        <button
            onClick={handleClick}
            id={'admin-button'}
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 transition-colors duration-200"
        >
            <Settings size={18} />
            <span>Admin</span>
        </button>
    );
}

export default HeaderAdminPanelButton;