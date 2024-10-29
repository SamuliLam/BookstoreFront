import i18next from "i18next";
import  { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                welcomeMessage: "Welcome to your favorite bookstore!"
            }
        },
        fi: {
            translation: {
                welcomeMessage: "Tervetuloa suosikkikirjakauppaasi!"
            }
        },
        sv: {
            translation: {
                welcomeMessage: "Välkommen till din favoritbokhandel!"
            }
        },
    }
})