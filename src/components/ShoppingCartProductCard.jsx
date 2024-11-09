import React from "react";
import { useCartContext } from "../context/CartContext.jsx";
import CartButton from "./CartButton.jsx";
import {useTranslation} from "react-i18next";

const ShoppingCartProductCard = ({ book }) => {
    const { title, price, image_url, quantity } = book;
    const { addToCart, removeFromCart } = useCartContext();
    const { t, i18n } = useTranslation();
    return (
        <div className="flex p-2 border-t border-b border-gray-200 bg-gray-75">
            <img src={image_url} alt={title} className="h-32 w-25 object-cover" />
            <div className="flex-1 flex flex-col justify-start text-sm ml-2">
                <h4 className="font-bold mt-2 mb-3 dark:text-white">{title}</h4>
                <div className="flex flex-col gap-2 mb-2">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 w-full">
                        <p className="text-gray-600 dark:text-white font-medium text-center">{price * quantity}€</p>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 w-full">
                        <p className="text-gray-600 dark:text-white font-medium text-center">{t("qtyInfo")} {quantity}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 ml-2" id="add-remove-buttons">
                <CartButton onClick={() => addToCart(book)} type="add" />
                <CartButton onClick={() => removeFromCart(book)} type="remove" />
            </div>
        </div>
    );
};

export default ShoppingCartProductCard;