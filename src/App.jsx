import './styles/App.css';
import AppRoutes from "./routes/AppRoutes.jsx";
import { UserProvider } from "./context/UserContext.jsx";

const App = () => {
    return (
        <UserProvider>
            <AppRoutes/>
        </UserProvider>
    );
};

export default App;
