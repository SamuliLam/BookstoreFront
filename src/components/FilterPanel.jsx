const FilterPanel = () => {
    return (
        <aside className="p-4 w-64 bg-gray-100">
            <h3>Keywords</h3>
            <div className="my-4">
                <button className="bg-gray-200 rounded-full px-2 py-1 mr-2">Spring</button>
                <button className="bg-gray-200 rounded-full px-2 py-1 mr-2">Smart</button>
                <button className="bg-gray-200 rounded-full px-2 py-1 mr-2">Modern</button>
            </div>
            <h4>Color</h4>
            {/* More filters here */}
        </aside>
    );
};

export default FilterPanel;
