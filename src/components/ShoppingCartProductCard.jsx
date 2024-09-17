import React from "react";

const ShoppingCartProductCard = ({title, price, image}) => {
    return (
        <div className={"flex items-center p-2 border-b border-gray-200"}>
            <img src={image} alt={title} className={"h-20 w-20 object-cover"}/>
            <div className={"flex-1"}>
                <h4 className={"text-lg font-bold"}>{title}</h4>
                <p className={"text-gray-600"}>{price}€</p>
            </div>
        </div>
    )
}

export default ShoppingCartProductCard;