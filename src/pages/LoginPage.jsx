import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { logIn } from '../utils/api';
import bookImage from '../assets/readbook.png';
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

const LoginPage = () => {
    const { login } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setError('');
        try {
            const { success, user, error: loginError } = await logIn({ email, password });
            if (success && user) {
                login(user);
                setSuccessMessage(t("loginSuccessLoginMessage"));

                setTimeout(() => {
                    const intendedDestination = sessionStorage.getItem("intendedDestination");
                    if (intendedDestination) {
                        navigate(intendedDestination);
                        sessionStorage.removeItem("intendedDestination");
                    } else {
                        navigate('/');
                    }
                }, 2000);
            } else {
                setError(loginError || t('loginFailedMessage'));
            }
        } catch (err) {
            setError(t('loginUnexpectedError'));
            console.error(err);
        }
    };
    return (
        <div className="main-container flex min-h-screen">
            <div className="hidden xl:block w-1/2 flex flex-col justify-start items-start">
                <img
                    src={bookImage}
                    alt="Books"
                    className="w-[100vw] h-[100vh]"
                />
            </div>
            <div
                className="w-[100vw] xl:w-1/2 flex flex-col justify-center items-center dark:bg-gray-900 dark:text-white">
                <form onSubmit={handleSubmit} className="w-1/2">
                    <h2 className="text-2xl font-light mb-6 text-center ">{t("loginPageSignIn")}</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="email">
                            {t("loginPageEmail")}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder={t("loginPageEmail")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                               htmlFor="password">
                            {t("loginPagePassword")}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder={t("loginPagePassword")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4" id="alert-message">{error}</p>}
                    {successMessage && <p id={'success-message'} className="text-green-500 text-xs italic mb-4">{successMessage}</p>}
                    <div className="flex items-center justify-between mb-4">
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 underline"
                            href="/"
                        >
                            {t("loginPageForgotPass")}
                        </a>
                    </div>
                    <button
                        className="dark:hover:bg-blue-300 bg-black text-white font-bold py-2 px-4 rounded w-full hover:bg-gray-700 focus:outline-none focus:shadow-outline dark:bg-blue-500"
                        type="submit"
                        id={"login-form-submit"}
                    >
                        {t("loginPageSignIn")}
                    </button>
                    <div className="text-center mt-6">
                        <p className="text-gray-600 text-sm dark:text-white">{t("loginPageOr")}</p>
                        <a href="/signup"
                           className="text-blue-500 hover:text-blue-800 font-bold dark:text-blue-400 dark:hover:text-blue-800">{t("loginPageSignUp")}</a>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default LoginPage;
