import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => (
    <Link
        to="/login"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
    >
        Login
    </Link>
);

export default LoginButton;