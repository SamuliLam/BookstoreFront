import {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Book from '../components/books/Book';
import Layout from "../components/Layout.jsx";
import HomePage from "../pages/HomePage.jsx";
import Loader from "../components/Loader.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import OrderPage from "../pages/OrderPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRoutes = () => (
    <Suspense fallback={<Loader/>}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/book/:id" element={<Book/>}/>
                    <Route path="/admin" element={<PrivateRoute requiredRole="ADMIN">
                        <AdminPage/>
                    </PrivateRoute>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/order" element={<OrderPage/>}/>
                    <Route path="/profile" element={<PrivateRoute requiredRole="USER">
                        <ProfilePage/>
                    </PrivateRoute>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </Suspense>
);

export default AppRoutes;
