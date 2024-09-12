import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";


const Layout = () => (
    <div className={"main-container flex-col"}>
        <Header />
        <Outlet />
    </div>
);

export default Layout;