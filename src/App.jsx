import './styles/App.css';
import AppRoutes from "./routes/AppRoutes.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import {FilterProvider} from "./context/FilterContext.jsx";

const App = () => {
    return (
        <UserProvider>
            <FilterProvider>
                <AppRoutes/>
            </FilterProvider>
        </UserProvider>
    );
};

export default App;
