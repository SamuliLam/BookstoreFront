
import {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Book from '../components/books/Book';
import Layout from "../components/Layout.jsx";
import HomePage from "../pages/HomePage.jsx";
import Loader from "../components/Loader.jsx";

const AppRoutes = () => (
    <Suspense fallback={<Loader />}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/book/:id" element={<Book />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Suspense>
);

export default AppRoutes;
