import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortOptions from './components/SortOptions';
import ProductGrid from './components/ProductGrid';
import Book from './components/Books/Book';

const Layout = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <div className="flex">
                <FilterPanel />
                <div className="flex-1 p-4">
                    <SortOptions />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="books" element={<ProductGrid />} />
                    <Route path="book/:id" element={<Book />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;