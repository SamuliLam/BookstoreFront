import React, { useContext } from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import { Link } from 'react-router-dom';
import { FilterContext } from '../context/FilterContext.jsx';
import ProductCard from "./ProductCard.jsx";
import {SearchResultContext} from "../context/SearchContext.jsx";

const ProductGrid = () => {
    const { books, loading, error } = useFetchBooks();
    const { selectedGenre, selectedPrice } = useContext(FilterContext);
    const { searchResults } = useContext(SearchResultContext);

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error}</div>;

    const filteredBooks = (searchResults.length > 0 && searchResults !== null ? searchResults : books).filter(book => {
        return (!selectedGenre || book.genre === selectedGenre) && (!selectedPrice || book.price <= selectedPrice);
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 p-4">
            {filteredBooks.length === 0 ? (
                <p>No books found</p>
            ) : (
                filteredBooks.map((book) => (
                    <div key={book.book_id} className="flex flex-col items-center space-y-4">
                        <Link to={`/book/${book.book_id}`}>
                            <ProductCard price={book.price} title={book.title} image={book.image_url} />
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductGrid;