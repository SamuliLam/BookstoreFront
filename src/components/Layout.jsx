import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";


const Layout = () => (
    <div className={"main-container flex-col"}>
        <Header />
        <Outlet />
        <Footer />
    </div>
);

export default Layout;