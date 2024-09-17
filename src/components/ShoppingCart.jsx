import React, {useState, useEffect, useRef} from 'react';
import {FaShoppingCart, FaTimes} from "react-icons/fa";
import ShoppingCartProductCard from "./ShoppingCartProductCard.jsx";
import {useCartContext} from "../context/CartContext.jsx";

const ShoppingCart = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cartRef = useRef(null);
    const overlayRef = useRef(null);
    const {cart} = useCartContext();
    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

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
    }, []);

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
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                <span onClick={handleToggle} className="text-2xl hover:text-blue-500 cursor-pointer">
                        <FaTimes/>
                    </span>
                <div>
                    <h2 className="text-2xl font-bold p-4">Shopping Cart</h2>
                    <div ref={overlayRef} className="overflow-y-auto h-96">
                        {cart.length === 0 ? (
                            <p className="p-4">No items in the cart</p>
                        ) : (
                            cart.map((book) => (
                                <ShoppingCartProductCard key={book.book_id} title={book.title} price={book.price}
                                                         image={book.image_url}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;