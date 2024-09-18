import React, {useEffect} from 'react';
import {FaShoppingCart, FaTimes} from "react-icons/fa";
import ShoppingCartProductCard from "./ShoppingCartProductCard.jsx";
import {useCartContext} from "../context/CartContext.jsx";

const ShoppingCart = () => {
    const {cart, isVisible, handleToggle, handleClickOutside, cartRef, overlayRef} = useCartContext();

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

    return (
        <div>
            <button onClick={handleToggle} className="text-3xl hover:text-blue-500">
                <FaShoppingCart/>
            </button>
            <div
                className={`fixed inset-0 bg-gray-800 transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0 pointer-events-none'} z-40`}
                onClick={handleToggle}
            ></div>
            <div
                ref={cartRef}
                className={`fixed top-0 text-black right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                <span onClick={handleToggle} className="text-2xl hover:text-blue-500 cursor-pointer">
                    <FaTimes/>
                </span>
                <div>
                    <h2 className="text-lg font-light p-4">Shopping Cart</h2>
                    <div ref={overlayRef} className="flex-1 overflow-y-auto max-h-[80vh]">
                        {cart.length === 0 ? (
                            <p className="text-base font-light p-4">No items in the cart</p>
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
                            <div className="flex justify-between p-4">
                                <p className="text-sm font-light">Total:</p>
                                <p className="text-sm font-light">
                                    {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}€
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;