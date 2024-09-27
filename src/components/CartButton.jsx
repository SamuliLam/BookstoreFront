import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const CartButton = ({ onClick, type }) => {
    return (
        <button
            onClick={onClick}
            className="border border-gray-200 w-6 h-6 flex items-center justify-center text-sm font-light p-1"
        >
            {type === "add" ? (
                <FaPlus style={{ fontSize: '0.75rem', fontWeight: '300' }} />
            ) : (
                <FaMinus style={{ fontSize: '0.75rem', fontWeight: '300' }} />
            )}
        </button>
    );
};

export default CartButton;