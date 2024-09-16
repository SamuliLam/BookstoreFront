import './styles/App.css';
import AppRoutes from "./routes/AppRoutes.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import {FilterProvider} from "./context/FilterContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";

const App = () => {
    return (
        <UserProvider>
            <CartProvider>
                <FilterProvider>
                    <AppRoutes/>
                </FilterProvider>
            </CartProvider>
        </UserProvider>
    );
};

export default App;
