import axios from 'axios';
import {useEffect, useState} from "react";

const useFetchBooks = () => {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/books');
                setBooks(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return { books, loading, error };
};

export default useFetchBooks;
