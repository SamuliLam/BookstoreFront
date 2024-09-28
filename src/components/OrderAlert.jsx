import React from 'react';
import {FaCheck, FaTimes} from "react-icons/fa";

const OrderAlert = ({message, status}) => {
    return (
        <div
            className={`${status ? "bg-green-200" : "bg-red-200"} p-2 rounded-md shadow-lg flex items-center justify-left space-x-2`}>
            {status ? <FaCheck className="text-green-700 text-2xl"/> : <FaTimes className="text-red-700 text-2xl"/>}
            <p className="text-center text-lg-light italic">{message}</p>
        </div>
    )
}

export default OrderAlert;