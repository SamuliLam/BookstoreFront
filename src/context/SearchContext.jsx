import React from "react";

const SearchResultContext = React.createContext({
    searchResults: [],
    updateSearchResults: () => {}
});

const SearchResultContextProvider = ({ children }) => {

    const [searchResults, setSearchResults] = React.useState([]);


    const updateSearchResults = (newResults) => {
        setSearchResults(newResults);
        console.log("Search results updated to:", newResults)
    }

    return (
        <SearchResultContext.Provider value={{ searchResults, updateSearchResults }}>
            {children}
        </SearchResultContext.Provider>
    );
}

export { SearchResultContext, SearchResultContextProvider };