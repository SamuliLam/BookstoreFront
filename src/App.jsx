import './styles/App.css';
import AppRoutes from "./routes/AppRoutes.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import {FilterProvider} from "./context/FilterContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {SearchResultContextProvider} from "./context/SearchContext.jsx";

const App = () => {
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
