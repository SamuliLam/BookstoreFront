import React, {useContext} from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import {FilterContext} from '../context/FilterContext.jsx';
import ProductCard from "./ProductCard.jsx";
import {SearchResultContext} from "../context/SearchContext.jsx";
import {useTranslation} from "react-i18next";

const ProductGrid = () => {
    const { t, i18n } = useTranslation();
    const {books, loading, error} = useFetchBooks();
    const {selectedGenre, selectedPrice} = useContext(FilterContext);
    const { searchResults } = useContext(SearchResultContext);

    if (loading) return <div>{t("ProductGridDivLoading")}</div>;
    if (error) return <div>{t("ProductGridDivError") + error}</div>;


    const filteredBooks = (searchResults.length > 0 ? searchResults : books).filter(book => {
        return (!selectedGenre || book.genre === selectedGenre) && (!selectedPrice || book.price <= selectedPrice);
    });


    return (
        <div className="productgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 p-4">
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