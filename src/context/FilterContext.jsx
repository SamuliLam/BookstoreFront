import { createContext, useState, useEffect } from 'react';
import useFetchBooks from '../hooks/useFetchBooks';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(100);
    const [minPrice, setMinPrice] = useState(100);
    const [maxPrice, setMaxPrice] = useState(100);
    const { books, loading, error } = useFetchBooks();

    useEffect(() => {
        if (!loading && !error) {
            const minBookPrice = Math.min(...books.map(book => book.price));
            const maxBookPrice = Math.max(...books.map(book => book.price));
            setMinPrice(minBookPrice);
            setMaxPrice(maxBookPrice);
            setSelectedPrice(maxBookPrice);
        }
    }, [books, loading, error]);

    return (
        <FilterContext.Provider value={{ selectedGenre, setSelectedGenre, selectedPrice, setSelectedPrice, minPrice, maxPrice }}>
            {children}
        </FilterContext.Provider>
    );
};