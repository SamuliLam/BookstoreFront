import React from "react";

export const InputField = ({label, value, name, onChange}) => (
    <div className="flex flex-col">
        <label className="font-bold">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="border rounded p-2"
        />
    </div>
);