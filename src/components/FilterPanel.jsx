import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext.jsx';
import { useState } from 'react';

const FilterPanel = () => {
    const { selectedGenre, setSelectedGenre, selectedPrice, setSelectedPrice, minPrice } = useContext(FilterContext);
    const [isOpen, setIsOpen] = useState(false);
    const genres = ['Satire', 'Romance', 'Horror', 'Historical', 'FictionHistorical', 'Fiction', 'Epic', 'Fantasy', 'Dystopian', 'Drama', 'Adventure'].sort();

    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(true)} className="fixed left-0 top-50 transform -translate-y-1/2 m-4 p-4 text-2xl dark:text-white">
                &lt;
            </button>
        );
    }

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre === selectedGenre ? null : genre);
    };

    const handlePriceChange = (event) => {
        setSelectedPrice(Number(event.target.value));
    };

    return (
        <aside className="p-4 w-64 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <button onClick={() => setIsOpen(false)}
                    className="float-right top-50 transform -translate-y-1/2 m-4 p-4 text-2xl">
                &gt;
            </button>
            <h3 className="font-bold mb-2">Keywords</h3>
            <h4 className="font-semibold mt-4 mb-2">Genre</h4>
            <div className="genrechoice my-4 flex flex-wrap">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        className={`bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 text-sm  ${selectedGenre === genre ? 'bg-blue-300 text-white' : 'bg-blue-900 text-black dark:text-black'}`}
                        onClick={() => handleGenreClick(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
            <h4 className="font-semibold mt-4 mb-2">Price</h4>
            <input
                type="range"
                min={minPrice}
                max="100"
                value={selectedPrice}
                onChange={handlePriceChange}
                className="w-full"
            />
            <p className="mt-2">Max Price: {selectedPrice}€</p>
        </aside>
    );
};

export default FilterPanel;