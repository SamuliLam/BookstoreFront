import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

const LoginButton = () => {
    const {t, i18n} = useTranslation();
    return (<Link
        to="/login"
        className="login-button px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
    >
        {t("LoginButtonButtonText")}
    </Link>
    );
}

export default LoginButton;