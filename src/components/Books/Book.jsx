import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import useFetchBook from '../../hooks/useFetchBook';
import { useCartContext } from '../../context/CartContext.jsx';
import {fetchInventoryResult} from '../../utils/api.js';

const Book = () => {
    const { id } = useParams();  // Extract the book ID from the URL
    const { book, loading, error } = useFetchBook(id);
    const { addToCart, isVisible, handleToggle } = useCartContext();
    const [inventory, setInventoryData] = useState([]);
    const staticDescription = "This is a detailed description of the book. It includes information about the plot, themes, and significance in its genre. Readers will enjoy this book for its engaging narrative and deep historical context.";
    const [transformStyle, setTransformStyle] = useState('');

    useEffect(() => {
        const getInventory = async () => {
            const inventoryData = await fetchInventoryResult(id);
            setInventoryData(inventoryData);
        }
        getInventory();

    }, [id]);


    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const normalizedX = (x / card.offsetWidth) - 0.5;
        const normalizedY = (y / card.offsetHeight) - 0.5;

        const centerY = 0;

        const isAboveCenter = normalizedY < centerY;


        const rotateX = (isAboveCenter ? -normalizedY : normalizedY) * 15;
        const rotateY = normalizedX * 15;

        setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const handleMouseLeave = () => {
        setTransformStyle('');
    };

    const handleAddToCart = (book) => {
        addToCart(book);
        if (!isVisible) {
            handleToggle();
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen w-screen px-4 py-8 dark:bg-gray-900 dark:text-white">
            <div className="w-full flex flex-col md:flex-row p-6" >
                <div className="md:w-2/4 w-full flex justify-center mb-6 md:mb-0">
                    <img
                        className="shadow-custom-dark rounded-lg object-cover w-80 h-96"
                        src={book.image_url || 'https://fallback-image-url.com/default.jpg'}
                        alt={book.title}
                        style={{ transform: transformStyle }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>

                {/* Book Details */}
                <div className="md:w-2/4 w-full md:pl-6 light:text-gray-600 dark:text-white">
                    <h1 className="text-3xl font-bold mb-4 text-center md:text-left ">{book.title}</h1>
                    <p className="text-xl mb-2">
                        <strong>Author: </strong>
                        {book.authors && book.authors.length > 0 ? (
                            book.authors.map((author, index) => (
                                <span key={author.author_id}>
                                    {author.firstName} {author.lastName}
                                    {index < book.authors.length - 1 && ', '}
                                </span>
                            ))
                        ) : (
                            <span>No authors available</span>
                        )}
                    </p>
                    <p className="text-xl mb-2"><strong>ISBN:</strong> {book.isbn}</p>
                    <p className="text-xl mb-2"><strong>Genre:</strong> {book.genre}</p>
                    <p className="text-xl mb-2"><strong>Type:</strong> {book.type}</p>
                    <p className="text-xl mb-2"><strong>Publication Year:</strong> {book.publication_year}</p>
                    <p className="text-xl text"><strong>Condition:</strong> {book.book_condition}</p>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-center md:justify-start mb-4">
                    <span className="text-3xl font-semibold text-green-900 mr-4 dark:text-white">€{book.price}</span>
                        <button onClick={() => handleAddToCart(book)}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg">
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-4 dark:text-white">
                        <h2 className="text-xl font-bold mb-2 dark:text-white">Description</h2>
                        <p className="text-gray-700 dark:text-white">{staticDescription}</p>
                    </div>

                    <div className="mt-4 dark:text-white">
                        <h2 className="text-xl font-bold mb-2">In Stock: </h2>
                        <p className="text-xl mb-2">New: {inventory.stock_level_new}</p>
                        <p className="text-xl mb-2">Used: {inventory.stock_level_used}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
