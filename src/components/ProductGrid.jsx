import React from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import { Link } from 'react-router-dom';

const ProductGrid = () => {
    const { books, loading, error } = useFetchBooks();

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 p-4">
            {books.length === 0 ? (
                <p>No books found</p>
            ) : (
                books.map((book) => (
                    <div key={book.book_id} className="flex flex-col items-center space-y-4">

                        <Link
                            to={`/book/${book.book_id}`}
                            className="block w-full h-auto max-w-xs flex items-center justify-center overflow-hidden rounded-lg shadow-md"
                        >
                            <div className="w-48 h-64">
                                <img
                                    src={book.image_url || 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1653971493i/61198963.jpg'}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Link>


                        <div className="w-full text-center space-y-2">
                            <h2 className="text-lg font-semibold truncate">{book.title}</h2>
                            <p className="text-gray-700 truncate">{book.author}</p>
                            <p className="text-gray-800 font-bold">${book.price}</p>


                            <button className="border border-black bg-white text-black px-10 py-2 rounded-full hover:bg-blue-600">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductGrid;
