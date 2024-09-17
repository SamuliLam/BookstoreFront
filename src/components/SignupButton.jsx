import React from 'react';
import { Link } from 'react-router-dom';

const SignupButton = () => (
    <Link
        to="/signup"
        className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
    >
        Signup
    </Link>
);

export default SignupButton;