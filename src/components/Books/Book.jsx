import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchBook from '../../hooks/useFetchBook';
import { useCartContext } from '../../context/CartContext.jsx';

const Book = () => {
    const { id } = useParams();  // Extract the book ID from the URL
    const { book, loading, error } = useFetchBook(id);
    const { addToCart, isVisible, handleToggle } = useCartContext();
    const staticDescription = "This is a detailed description of the book. It includes information about the plot, themes, and significance in its genre. Readers will enjoy this book for its engaging narrative and deep historical context.";

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    const handleAddToCart = (book) => {
        addToCart(book);
        if (!isVisible) {
            handleToggle();
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4 py-8 dark:bg-gray-900 dark:text-white">
            <div className="w-full flex flex-col md:flex-row p-6">
                <div className="md:w-2/4 w-full flex justify-center mb-6 md:mb-0">
                    <img
                        className="shadow-custom-dark rounded-lg object-cover w-80 h-96"
                        src={book.image_url || 'https://fallback-image-url.com/default.jpg'}
                        alt={book.title}
                    />
                </div>

                {/* Book Details */}
                <div className="md:w-2/4 w-full md:pl-6 ">
                    <h1 className="text-3xl font-bold mb-4 text-center md:text-left dark:text-white">{book.title}</h1>
                    <p className="text-xl text-gray-600 mb-2 dark:text-white"><strong>ISBN:</strong> {book.isbn}</p>
                    <p className="text-xl text-gray-600 mb-2 dark:text-white"><strong>Genre:</strong> {book.genre}</p>
                    <p className="text-xl text-gray-600 mb-2 dark:text-white"><strong>Type:</strong> {book.type}</p>
                    <p className="text-xl text-gray-600 mb-2 dark:text-white"><strong>Publication Year:</strong> {book.publication_year}</p>
                    <p className="text-xl text-gray-600 mb-4 dark:text-white"><strong>Condition:</strong> {book.book_condition}</p>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-center md:justify-start mb-4">
                        <span className="text-3xl font-semibold text-red-600 mr-4">€{book.price}</span>
                        <button onClick={() => handleAddToCart(book)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg">
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-4 dark:text-white">
                        <h2 className="text-xl font-bold mb-2 dark:text-white">Description</h2>
                        <p className="text-gray-700 dark:text-white">{staticDescription}</p>
                    </div>

                    <div className="mt-4 dark:text-white">
                        <h2 className="text-xl font-bold mb-2">Quantity of the following book in inventory: </h2>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
