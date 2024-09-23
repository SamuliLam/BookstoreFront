import {useContext, useState} from "react";
import {fetchSearchResults} from "../utils/api.js";
import {SearchResultContext} from "../context/SearchContext.jsx";


const SearchBar = () => {

    const {updateSearchResults} = useContext(SearchResultContext);

    const [searchText, setSearchText] = useState('');

    const search = async () => {
        const results = await fetchSearchResults(searchText);
        updateSearchResults(results);
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    }


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log("Enter key pressed");
            console.log("Search text:", searchText);
            search();
        }
    }

    const handleButtonClick = () => {
        search();
    }

    return (
        <div className="flex justify-center p-4">
            <input
                type="text"
                className="border rounded-lg w-full max-w-lg p-2"
                placeholder="Hinted search text"
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyPress(e)}
            />
            <button className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleButtonClick}
            >Search</button>
        </div>
    );

};

export default SearchBar;
