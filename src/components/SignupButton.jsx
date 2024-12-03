import React from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const SignupButton = () => {
    const { t } = useTranslation();
    return(
    <Link
        to="/signup"
        className="signup-button px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
    >
        {t("SignupButtonButtonText")}
    </Link>
    )
};

export default SignupButton;