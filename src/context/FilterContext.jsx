import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { fetchBooks } from '../utils/api.js';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(100);
    const [minPrice, setMinPrice] = useState(100);
    const [maxPrice, setMaxPrice] = useState(100);
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            const currentLanguage = i18next.language;
            console.log("Current language:", currentLanguage);

            try {
                const data = await fetchBooks();  // Calls fetchBooks from api.js
                setBooks(data);
                const minBookPrice = Math.min(...data.map(book => book.price));
                const maxBookPrice = Math.max(...data.map(book => book.price));
                setMinPrice(minBookPrice);
                setMaxPrice(maxBookPrice);
                setSelectedPrice(maxBookPrice);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    const contextValue = useMemo(() => ({
        selectedGenre,
        setSelectedGenre,
        selectedPrice,
        setSelectedPrice,
        minPrice,
        maxPrice,
        books,
        loading,
        error
    }), [selectedGenre, selectedPrice, minPrice, maxPrice, books, loading, error]);

    return (
        <FilterContext.Provider value={contextValue}>
            {children}
        </FilterContext.Provider>
    );
};

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};