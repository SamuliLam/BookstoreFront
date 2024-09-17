import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const item = sessionStorage.getItem('cart');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });
    const [isVisible, setIsVisible] = useState(false);
    const cartRef = useRef(null);
    const overlayRef = useRef(null);

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

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (book) => {
        setCart((prevCart) => {
            const existingBook = prevCart.find((item) => item.book_id === book.book_id);
            if (existingBook) {
                return prevCart.map((item) =>
                    item.book_id === book.book_id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...book, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (book) => {
        setCart((prevCart) => {
            const existingBook = prevCart.find((item) => item.book_id === book.book_id);
            if (existingBook) {
                if (existingBook.quantity === 1) {
                    return prevCart.filter((item) => item.book_id !== book.book_id);
                } else {
                    return prevCart.map((item) =>
                        item.book_id === book.book_id ? { ...item, quantity: item.quantity - 1 } : item
                    );
                }
            }
            return prevCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isVisible, handleToggle, handleClickOutside, cartRef, overlayRef }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};