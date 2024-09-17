import React from "react";
import {useCartContext} from "../context/CartContext.jsx";

const ShoppingCartProductCard = ({book}) => {
    const {title, price, image_url, quantity} = book;
    const { addToCart, removeFromCart } = useCartContext();
    return (
        <div className="flex items-center p-2 border-t border-b border-gray-200 bg-gray-75">
            <img src={image_url} alt={title} className="h-30 w-20 object-cover"/>
            <div className="flex-1">
                <h4 className="text-lg font-bold">{title}</h4>
                <p className="text-gray-600">{price}€</p>
                <p className="text-gray-600">Quantity: {quantity}</p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => removeFromCart(book)}
                    className="text-red-500 hover:text-red-700 px-2"
                >
                    -
                </button>
                <button
                    onClick={() => addToCart(book)}
                    className="text-green-500 hover:text-green-700 px-2"
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default ShoppingCartProductCard;