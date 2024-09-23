import React, { useState } from 'react';
import { useUserContext } from "../context/UserContext.jsx";
import { useCartContext } from "../context/CartContext.jsx";
import { updateUserProfile } from "../utils/userApiUtils.js";
import { addOrder } from "../utils/api.js";

const OrderPage = () => {

    const { user } = useUserContext();
    const { cart } = useCartContext();
    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        street_name: user.street_name,
        postal_code: user.postal_code,
        province: user.province,
        phone_number: user.phone_number,
    });


    const handleChange = (e) => {
        const { name, value,} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            postal_code: parseInt(formData.postal_code, 10),
        };
        const orderData = {
            user_id: user.user_id,
            orderItems: cart.map((book) => ({
                book_id: parseInt(book.book_id, 10),
                quantity: parseInt(book.quantity, 10),
                price: book.price.toString(),
            })),
        };
        updateUserProfile(user.user_id, updatedFormData, user.token).then((response) => {
            if (response.success) {
                addOrder(orderData, user.token).then((response) => {
                    if (response.success) {
                        alert('Order placed successfully');
                    } else {
                        alert('Failed to place order');
                    }
                });
            }
        });
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center  w-screen p-5">
            <form onSubmit={handleSubmit} className="w-2/6 space-y-6 m-10">
                <h2 className="text-xl font-bold">Recipient Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-md"
                    />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-md"
                    />
                </div>

                <input
                    type="text"
                    name="street_name"
                    placeholder="Address"
                    value={formData.street_name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-md"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="postal_code"
                        placeholder="Postal Code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md"
                    />

                    <input
                        type="text"
                        name="province"
                        placeholder="Province"
                        value={formData.province}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md"
                    />
                </div>

                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone number (in the format +358..)"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-md"
                />

                <button
                    type="submit"
                    className="bg-black text-white py-3 rounded-md hover:bg-gray-800 w-1/4 mx-auto block"
                >
                    Confirm Order
                </button>
            </form>

            <div className="w-full lg:w-1/3 p-6 border border-gray-200 rounded-md">
                {cart.map((book) => (
                    <div key={book.book_id} className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-4">
                            <img src={book.image_url} alt={book.title} className="w-16 h-16 object-cover rounded-md" />
                            <div>
                                <h3 className="text-lg font-semibold">{book.title}</h3>
                            </div>
                        </div>
                        <p className="text-lg font-semibold">{book.price}€</p>
                    </div>
                ))
                }

                <div className="mt-6">
                    <p className="text-lg font-semibold">Total: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}€</p>
                </div>
            </div>
        </div>
    );
};


export default OrderPage;