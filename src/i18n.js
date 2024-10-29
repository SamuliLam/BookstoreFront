import i18n from "i18next";
import { initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        fi: {

        },
        sv: {

        },
        en: {
            translation: {
                favoriteBooks: "Welcome to your favorite bookstore, for your killing pleasure."
            }
        }
    }
})

export default i18n;


