import { createContext, useState, useEffect } from 'react';
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

    return (
        <FilterContext.Provider value={{ selectedGenre, setSelectedGenre, selectedPrice, setSelectedPrice, minPrice, maxPrice, books, loading, error }}>
            {children}
        </FilterContext.Provider>
    );
};
