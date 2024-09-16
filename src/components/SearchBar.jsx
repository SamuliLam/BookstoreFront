import {useEffect, useState} from "react";
import {fetchSearchResults} from "../utils/api.js";


const SearchBar = () => {

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const search = async () => {
        const results = await fetchSearchResults(searchText);
        console.log("Search results:", results);
        setSearchResults(results);
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
            <button className="ml-2 p-2 bg-blue-500 text-white rounded"
                    onClick={handleButtonClick}
            >Search</button>
        </div>
    );

};

export default SearchBar;
