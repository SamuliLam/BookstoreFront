import React from "react";
import useFetchBooks from "../hooks/useFetchBooks"; // Import the new hook
import { Link } from 'react-router-dom';

const ProductGrid = () => {
    const { books, loading, error } = useFetchBooks();

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error}</div>;
    console.log(books);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
            {books.length === 0 ? (
                <p>No books found</p>
            ) : (
                books.map((book) => (
                    <div
                        key={book.book_id}
                        className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center max-w-60 h-80"
                    >
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img
                                src={book.image_url || 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1653971493i/61198963.jpg'} alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex flex-col items-center text-center">
                            <h2 className="text-lg font-semibold mb-2 truncate">{book.title}</h2>
                            <p className="text-gray-700 text-sm truncate">by {book.author}</p>
                            <Link
                                to={`/book/${book.book_id}`}
                                className="mt-4 text-blue-500 hover:underline"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductGrid;
