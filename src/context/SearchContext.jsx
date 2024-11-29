import React, { useMemo } from "react";
import PropTypes from 'prop-types';

const SearchResultContext = React.createContext({
    searchResults: [],
    updateSearchResults: () => {}
});

const SearchResultContextProvider = ({ children }) => {
    const [searchResults, setSearchResults] = React.useState([]);

    const updateSearchResults = (newResults) => {
        setSearchResults(newResults);
        console.log("Search results updated to:", newResults);
    };

    const contextValue = useMemo(() => ({
        searchResults,
        updateSearchResults
    }), [searchResults]);

    return (
        <SearchResultContext.Provider value={contextValue}>
            {children}
        </SearchResultContext.Provider>
    );
};

SearchResultContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { SearchResultContext, SearchResultContextProvider };