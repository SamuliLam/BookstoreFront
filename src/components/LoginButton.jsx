import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => (
    <Link
        to="/login"
        className="login-button px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
    >
        Login
    </Link>
);

export default LoginButton;