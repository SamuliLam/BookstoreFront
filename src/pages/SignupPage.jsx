import React, { useState } from 'react';
import { useUserContext } from "../context/UserContext.jsx";
import { handleSignUp, logIn } from "../utils/api.js";
import bookImage from "../assets/readbook.png";
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

const SignupPage = () => {
    const { t, i18n } = useTranslation();
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
            <div className={"hidden xl:block w-1/2 flex flex-col justify-start items-start"}>
                <img src={bookImage} alt="Books" className="w-[100vw] h-[100vh]"/>
            </div>
            <div className={"w-[100vw] xl:w-1/2 flex flex-col justify-center items-center dark:bg-gray-900"}>
            <form onSubmit={handleSubmit} className="w-1/2">
                <h2 className="text-2xl font-light mb-6 text-center dark:text-white">{t("loginPageSignUp")}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="first_name">
                        {t("signupPageFirstName")}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="first_name"
                        type="text"
                        name={"first_name"}
                        placeholder={t("signupPageFirstName")}
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="last_name">
                        {t("signupPageLastName")}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="last_name"
                        type="text"
                        name={"last_name"}
                        placeholder={t("signupPageLastName")}
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="email">
                        {t("loginPageEmail")}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name={"email"}
                        placeholder={t("loginPageEmail")}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="password">
                        {t("loginPagePassword")}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name={"password"}
                        placeholder={t("loginPagePassword")}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="dark:hover:bg-blue-300 dark:bg-white dark:text-black bg-black text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-300 focus:outline-none focus:shadow-outline "
                    type="submit"
                >
                    {t("loginPageSignUp")}
                </button>
                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">{t("loginPageOr")}</p>
                    <a href="/login" className="text-blue-500 hover:text-blue-800 font-bold dark:text-blue-400 dark:hover:text-blue-800">{t("loginPageSignIn")}</a>
                </div>
            </form>
        </div>
    </div>
    );
}

export default SignupPage;