import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCartContext } from "../context/CartContext.jsx";

const ShoppingCartProductCard = ({ book }) => {
    const { title, price, image_url, quantity } = book;
    const { addToCart, removeFromCart } = useCartContext();
    return (
        <div className="flex p-2 border-t border-b border-gray-200 bg-gray-75">
            <img src={image_url} alt={title} className="h-32 w-25 object-cover" />
            <div className="flex-1 flex flex-col justify-start text-sm">
                <h4 className="font-bold mt-2 mb-3">{title}</h4>
                <p className="text-gray-600">{price * quantity}€</p>
                <p className="text-gray-600">Quantity: {quantity}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <button
                    onClick={() => addToCart(book)}
                    className="border border-gray-200 w-6 h-6 flex items-center justify-center text-sm font-light p-1"
                >
                    <FaPlus style={{ fontSize: '0.75rem', fontWeight: '300' }} />
                </button>
                <button
                    onClick={() => removeFromCart(book)}
                    className="border border-gray-200 w-6 h-6 flex items-center justify-center text-sm font-light p-1"
                >
                    <FaMinus style={{ fontSize: '0.75rem', fontWeight: '300' }} />
                </button>
            </div>
        </div>
    );
};

export default ShoppingCartProductCard;