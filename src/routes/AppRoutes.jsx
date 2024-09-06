
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Book from '../components/books/Book';
import AuthorPage from '../pages/AuthorPage';
import ProductGrid from "../components/ProductGrid.jsx";

const AppRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/books" element={<ProductGrid />} />
            <Route path="/book/:id" component={Book} />
            <Route path="/author/:id" component={AuthorPage} />
        </Switch>
    </Router>
);

export default AppRoutes;
