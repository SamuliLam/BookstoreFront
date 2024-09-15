import { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(100); // Default to max price

    return (
        <FilterContext.Provider value={{ selectedGenre, setSelectedGenre, selectedPrice, setSelectedPrice }}>
            {children}
        </FilterContext.Provider>
    );
};