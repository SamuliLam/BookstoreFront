// InventoryFields component for rendering inventory details
import {InputField} from "./InputField.jsx";
import React from "react";

export const InventoryFields = ({inventory, onChange}) => (
    <div className="flex flex-col">
        <label className="font-bold">Inventory</label>
        {Object.keys(inventory).map((inventoryKey, index) => (
            <InputField
                key={index}
                label={inventoryKey}
                value={inventory[inventoryKey]}
                name={`Inventory.${inventoryKey}`} // Nested key access
                onChange={onChange}
            />
        ))}
    </div>
);