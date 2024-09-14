import { Outlet } from 'react-router-dom';
import Header from "../components/Header.jsx";

const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>
                {/* Footer content */}
            </footer>
        </div>
    );
}