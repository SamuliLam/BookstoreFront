import React, {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const item = localStorage.getItem('cart');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (book) => {
        setCart([...cart, book]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
}