import './styles/App.css';
import AppRoutes from "./routes/AppRoutes.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import {FilterProvider} from "./context/FilterContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {SearchResultContextProvider} from "./context/SearchContext.jsx";
import './i18n.js';
import {useTranslation} from "react-i18next";
import {useEffect} from "react";

const App = () => {
    const { t, i18n } = useTranslation();
    useEffect(() => {
        i18n.changeLanguage(navigator.language);
    }, []);
    return (
        <SearchResultContextProvider>
            <UserProvider>
                <CartProvider>
                    <FilterProvider>
                        <AppRoutes/>
                    </FilterProvider>
                </CartProvider>
            </UserProvider>
        </SearchResultContextProvider>
    );
};

export default App;
