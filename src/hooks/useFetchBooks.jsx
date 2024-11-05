import axios from 'axios';
import {useEffect, useState} from "react";
import i18next from "i18next";

const useFetchBooks = () => {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentLanguage = i18next.language;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/books?language=' + currentLanguage);
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
