// ProductFields component for rendering products array
import {InputField} from "./InputField.jsx";
import React from "react";

export const ProductFields = ({products, onChange}) => (
    <div className="flex flex-col">
        {products.map((product, productIndex) => (
            <div key={productIndex} className="flex flex-col ml-4 border p-2 rounded">
                <label className="font-bold">Product {productIndex + 1}</label>
                {Object.keys(product).map((productKey, nestedIndex) => (
                    <InputField
                        key={nestedIndex}
                        label={productKey}
                        value={product[productKey]}
                        name={`Products[${productIndex}].${productKey}`} // Using array notation for nested keys
                        onChange={onChange}
                    />
                ))}
            </div>
        ))}
    </div>
);