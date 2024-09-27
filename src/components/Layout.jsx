import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";



const Layout = () => (
    <>
        <Header />
        <div className="layout root-container flex flex-grow">
            <Outlet />
        </div>
        <Footer />
    </>
);

export default Layout;