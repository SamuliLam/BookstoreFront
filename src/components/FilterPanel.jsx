import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext.jsx';

const FilterPanel = () => {
    const { selectedGenre, setSelectedGenre, selectedPrice, setSelectedPrice } = useContext(FilterContext);

    const genres = ['Satire', 'Romance', 'Horror', 'Historical', 'FictionHistorical', 'Fiction', 'Epic', 'Fantasy', 'Dystopian', 'Drama', 'Adventure'];

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre === selectedGenre ? null : genre);
    };

    const handlePriceChange = (event) => {
        setSelectedPrice(Number(event.target.value));
    };

    return (
        <aside className="p-4 w-64 bg-gray-100">
            <h3 className="font-bold mb-2">Keywords</h3>
            <h4 className="font-semibold mt-4 mb-2">Genre</h4>
            <div className="my-4 flex flex-wrap">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        className={`bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 text-sm ${selectedGenre === genre ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleGenreClick(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
            <h4 className="font-semibold mt-4 mb-2">Price</h4>
            <input
                type="range"
                min="0"
                max="100"
                value={selectedPrice}
                onChange={handlePriceChange}
                className="w-full"
            />
            <p className="mt-2">Max Price: ${selectedPrice}</p>
            <h4 className="font-semibold mt-4 mb-2">Color</h4>
            {/* More filters here */}
        </aside>
    );
};

export default FilterPanel;