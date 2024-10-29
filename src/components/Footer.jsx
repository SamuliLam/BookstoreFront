import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t, i18n } = useTranslation();
    return (
      <footer className="bg-gray-100 flex flex-col justify-center items-center min-h-[50px] dark:bg-gray-800 dark:text-blue-100">
          <p>{t("FooterPContactText") + "online.bookstore@gmail.com"}</p>
      </footer>

  );
}

export default Footer;