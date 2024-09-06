import './styles/App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ProductGrid from './components/ProductGrid';
import SortOptions from './components/SortOptions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './components/Books/Book'; // Import Book component

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <SearchBar />
                <div className="flex">
                    <FilterPanel />
                    <div className="flex-1 p-4">
                        <SortOptions />
                        <Routes>
                            <Route path="/books" element={<ProductGrid />} />
                            <Route path="/book/:id" element={<Book />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
