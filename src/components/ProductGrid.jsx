import React, { useContext, useState, useEffect } from "react";
import { fetchBooks } from "../utils/api.js";
import { FilterContext } from "../context/FilterContext.jsx";
import ProductCard from "./ProductCard.jsx";
import { SearchResultContext } from "../context/SearchContext.jsx";
import { useTranslation } from "react-i18next";

const ProductGrid = () => {
    const { t } = useTranslation();
    const { selectedGenre, selectedPrice } = useContext(FilterContext);
    const { searchResults } = useContext(SearchResultContext);

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks = await fetchBooks();
                setBooks(fetchedBooks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    if (loading) return <div>{t("ProductGridDivLoading")}</div>;
    if (error) return <div>{t("ProductGridDivError") + error}</div>;

    const filteredBooks = (searchResults.length > 0 ? searchResults : books).filter(book => {
        return (!selectedGenre || book.genre === selectedGenre) && (!selectedPrice || book.price <= selectedPrice);
    });

    return (
        <div className="productgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 p-4" id="product-grid">
            {filteredBooks.length === 0 ? (
                <p>{t("ProductGridPNoBooksFound")}</p>
            ) : (
                filteredBooks.map((book) => {
                    const authorNames = book.authors
                        .map(author => `${author.firstName} ${author.lastName}`)
                        .join(', ');

                    return (
                        <div key={book.book_id} className="productdetails flex flex-col items-center">
                            <ProductCard
                                author={authorNames || t("ProductCardPUnknownAuthor")}
                                price={book.price}
                                title={book.title}
                                image={book.image_url}
                                book={book}
                            />
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ProductGrid;
