import React, {useContext} from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import {FilterContext} from '../context/FilterContext.jsx';
import ProductCard from "./ProductCard.jsx";
import {useCartContext} from "../context/CartContext.jsx";

const ProductGrid = () => {
    const {books, loading, error} = useFetchBooks();
    const {selectedGenre, selectedPrice} = useContext(FilterContext);

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error}</div>;

    const filteredBooks = books.filter(book => {
        return (!selectedGenre || book.genre === selectedGenre) && (!selectedPrice || book.price <= selectedPrice);
    });



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 p-4">
            {filteredBooks.length === 0 ? (
                <p>No books found</p>
            ) : (
                filteredBooks.map((book) => (
                    <div key={book.book_id} className="flex flex-col items-center">
                        <ProductCard price={book.price} title={book.title} image={book.image_url}
                                     book={book}/>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductGrid;