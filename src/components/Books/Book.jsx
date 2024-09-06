import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchBook from '../../hooks/useFetchBook';

const Book = () => {
    const { id } = useParams();  // Extract the book ID from the URL
    const { book, loading, error } = useFetchBook(id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Type:</strong> {book.type}</p>
            <p><strong>Publication Year:</strong> {book.publication_year}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Condition:</strong> {book.book_condition}</p>
        </div>
    );
};

export default Book;
