const SearchBar = () => {
    return (
        <div className="flex justify-center p-4">
            <input
                type="text"
                className="border rounded-lg w-full max-w-lg p-2"
                placeholder="Hinted search text"
            />
            <button className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
        </div>
    );
};

export default SearchBar;
