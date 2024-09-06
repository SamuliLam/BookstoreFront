import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBook = (id) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) {
                setError("No book ID provided");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/books/${id}`);
                setBook(response.data);
            } catch (error) {
                setError("Error fetching book data: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    return { book, loading, error };
};

export default useFetchBook;
