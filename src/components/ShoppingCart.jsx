import React, { useEffect } from 'react';
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import ShoppingCartProductCard from "./ShoppingCartProductCard.jsx";
import { useCartContext } from "../context/CartContext.jsx";
import { useUserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

const ShoppingCart = () => {
    const { cart, isVisible, handleToggle, clearCart, handleClickOutside, cartRef, overlayRef } = useCartContext();
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const overlayNode = overlayRef.current;
        if (overlayNode) {
            overlayNode.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            if (overlayNode) {
                overlayNode.removeEventListener('mousedown', handleClickOutside);
            }
        };
    }, [handleClickOutside, overlayRef]);

    const proceedToCheckout = () => {
        handleToggle();
        if (user) {
            navigate('/order');
        } else {
            sessionStorage.setItem("intendedDestination", "/order");
            navigate('/login');
        }
    };

    return (
        <div>
            <button
                onClick={handleToggle}
                className="flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-700 dark:text-white dark:hover:text-blue-700 focus:outline-none"
                id="cart-button"
            >
                <FaShoppingCart className="w-6 h-6"/>
            </button>
            <div
                className={`fixed inset-0 bg-gray-800 transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0 pointer-events-none'} z-40`}
                onClick={handleToggle}
            ></div>
            <div
                ref={cartRef}
                className={`dark:bg-gray-800 dark:text-white fixed top-0 text-black right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ cursor: 'default' }}
            >
                <span onClick={handleToggle} className="text-2xl hover:text-blue-500 cursor-pointer" id="close-button">
                    <FaTimes />
                </span>
                <div>
                    <h2 className="text-lg font-bold p-3">{t("shoppingCartH2")}</h2>
                    <div ref={overlayRef} className="flex-1 overflow-y-auto max-h-[75vh]" id="cart-items">
                        {cart.length === 0 ? (
                            <p className="text-base font-light p-4">{t("emptyCartInfo")}</p>
                        ) : (
                            cart.map((book) => (
                                <ShoppingCartProductCard
                                    key={book.book_id}
                                    book={book}
                                />
                            ))
                        )}
                    </div>
                    <div>
                        {cart.length > 0 && (
                            <div>
                                <div className="flex justify-between p-4">
                                    <div className="flex">
                                        <p className="text-sm font-bold">{t("shoppingCartTotal")} </p>
                                        <p className="text-sm font-bold">
                                            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}€
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <button className="text-sm font-light italic underline" id="clear-cart" onClick={clearCart}>{t("clearCart")}</button>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button className="bg-blue-500 text-base px-4 py-2 rounded-md hover:bg-blue-600 text-white" onClick={proceedToCheckout}>{t("checkoutBtn")}</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;