const SortOptions = () => {
    return (
        <div className="sortchoice flex space-x-4 my-4">
            <button className="px-4 py-2 bg-gray-200 rounded">New</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Price ascending</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Price descending</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Rating</button>
        </div>
    );
};

export default SortOptions;
