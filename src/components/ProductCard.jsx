import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext.jsx";
import { useTranslation } from "react-i18next";

const ProductCard = ({ title, author, price, image, book }) => {
    const { addToCart, isVisible, handleToggle } = useCartContext();
    const { t } = useTranslation();

    const [transformStyle, setTransformStyle] = useState('');

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const normalizedX = (x / card.offsetWidth) - 0.5;
        const normalizedY = (y / card.offsetHeight) - 0.5;

        const centerY = 0;

        const isAboveCenter = normalizedY < centerY;

        const rotateX = (isAboveCenter ? -normalizedY : normalizedY) * 30;
        const rotateY = normalizedX * 30;

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
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleAddToCart(book);
        }
    };

    return (
        <div className="productcard overflow-hidden flex flex-col items-center justify-between p-4 min-h-96 min-w-64">
            <button
                className="productcard-inner flex flex-col items-center h-80 w-full overflow-hidden shadow-custom-dark transition-transform duration-300 ease-in-out hover:shadow-xl transform-style: preserve-3d"
                style={{ transform: transformStyle }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {image ? (
                    <Link to={`/book/${book.book_id}`} className="block h-full w-full">
                        <img src={image} alt={title} className="h-full w-full object-cover"/>
                    </Link>
                ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <p className="text-gray-400">No image</p>
                    </div>
                )}
            </button>
            <div className="productcard-detail flex flex-col items-center gap-3">
                <h4 className="mt-2 text-lg font-bold text-center">{title}</h4>
                <p className="text-center text-gray-400 dark:text-white">{author}</p>
                <p className="text-center text-gray-600 dark:text-white">{price}€</p>
                <button
                    onClick={() => handleAddToCart(book)}
                    onKeyDown={handleKeyDown}
                    className="border border-black bg-white text-black px-10 py-2 rounded-full hover:bg-sky-200"
                    id="add-button"
                >
                    {t("ProductCardButtonAddToCart")}
                </button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    book: PropTypes.object.isRequired
};

export default ProductCard;