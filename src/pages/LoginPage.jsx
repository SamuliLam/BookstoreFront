import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { logIn } from '../utils/api';
import bookImage from '../assets/readbook.png';

const LoginPage = () => {
    const { setUser } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        try {
            const { success, user } = await logIn({ email, password });
            if (success) {
                setUser(user);
                setSuccessMessage('Login successful!');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="main-container flex min-h-screen">
            <div className="w-1/2 flex flex-col justify-start items-start">
                <img
                    src={bookImage}
                    alt="Books"
                    className="w-[50vw] h-[100vh]"
                />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit} className="w-1/2">
                    <h2 className="text-2xl font-light mb-6 text-center">Sign In</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    {successMessage && <p className="text-green-500 text-xs italic mb-4">{successMessage}</p>}
                    <div className="flex items-center justify-between mb-4">
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 underline"
                            href="#"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <button
                        className="bg-black text-white font-bold py-2 px-4 rounded w-full hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <div className="text-center mt-6">
                        <p className="text-gray-600 text-sm">OR</p>
                        <a href="/signup" className="text-blue-500 hover:text-blue-800 font-bold">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
