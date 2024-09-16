import {useState} from "react";
import {fetchSearchResults} from "../utils/api.js";


const SearchBar = () => {

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const search = async () => {
        const results = await fetchSearchResults(searchText);
        setSearchResults(results);
    };

    search();

    return (
        <div className="flex justify-center p-4">
            <input
                type="text"
                className="border rounded-lg w-full max-w-lg p-2"
                placeholder="Hinted search text"
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
        </div>
    );

};

export default SearchBar;
