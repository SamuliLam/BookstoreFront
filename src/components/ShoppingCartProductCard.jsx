import React from "react";
import { useCartContext } from "../context/CartContext.jsx";
import CartButton from "./CartButton.jsx";

const ShoppingCartProductCard = ({ book }) => {
    const { title, price, image_url, quantity } = book;
    const { addToCart, removeFromCart } = useCartContext();
    return (
        <div className="flex p-2 border-t border-b border-gray-200 bg-gray-75 ">
            <img src={image_url} alt={title} className="h-32 w-25 object-cover" />
            <div className="flex-1 flex flex-col justify-start text-sm">
                <h4 className="font-bold mt-2 mb-3 dark:text-white">{title}</h4>
                <p className="text-gray-600 dark:text-white">{price * quantity}€</p>
                <p className="text-gray-600 dark:text-white">Quantity: {quantity}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <CartButton onClick={() => addToCart(book)} type="add" />
                <CartButton onClick={() => removeFromCart(book)} type="remove" />
            </div>
        </div>
    );
};

export default ShoppingCartProductCard;