import React, { useState } from 'react';
import { useUserContext } from "../context/UserContext.jsx";
import { handleSignUp, logIn } from "../utils/api.js";
import bookImage from "../assets/readbook.png";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const { login } = useUserContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { success, user, error } = await handleSignUp(formData);
            if (success && user) {
                // If signup is successful, attempt to log in
                const loginResponse = await logIn({ email: formData.email, password: formData.password });
                if (loginResponse.success && loginResponse.user) {
                    login(loginResponse.user);
                    navigate("/");
                } else {
                    console.log("Signup successful, but login failed:", loginResponse.error);
                }
            } else {
                console.log("Signup failed:", error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="main-container flex min-h-screen">
            <div className={"w-1/2 flex flex-col justify-start items-start"}>
                <img src={bookImage} alt="Books" className="w-[100vw] h-[100vh]"/>
            </div>
            <div className={"w-1/2 flex flex-col justify-center items-center"}>
            <form onSubmit={handleSubmit} className="w-1/2">
                <h2 className="text-2xl font-light mb-6 text-center">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="first_name"
                        type="text"
                        name={"first_name"}
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="last_name"
                        type="text"
                        name={"last_name"}
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name={"email"}
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
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
                        name={"password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="bg-black text-white font-bold py-2 px-4 rounded w-full hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign Up
                </button>
                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">OR</p>
                    <a href="/login" className="text-blue-500 hover:text-blue-800 font-bold">Sign in</a>
                </div>
            </form>
        </div>
    </div>
    );
}

export default SignupPage;