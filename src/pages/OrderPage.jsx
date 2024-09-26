import React, {useState} from 'react';
import {useUserContext} from "../context/UserContext.jsx";
import {useCartContext} from "../context/CartContext.jsx";
import {updateUserProfile} from "../utils/userApiUtils.js";
import {addOrder} from "../utils/api.js";

const OrderPage = () => {
    const {user} = useUserContext();
    const {cart} = useCartContext();
    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        street_name: user.street_name,
        postal_code: user.postal_code,
        province: user.province,
        phone_number: user.phone_number,
    });

    const handleChange = (e) => {
        const {name, value,} = e.target;
        setFormData({
            ...formData, [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData, postal_code: parseInt(formData.postal_code, 10),
        };
        const orderData = {
            user_id: user.user_id, orderItems: cart.map((book) => ({
                book_id: book.book_id, quantity: book.quantity, price: book.price,
            })),
        };
        updateUserProfile(user.user_id, updatedFormData, user.token).then((response) => {
            if (response.success) {
                addOrder(orderData, user.token).then((response) => {
                    if (response.success) {

                    } else {

                    }
                });
            }
        });
    };
    return (
        <div className="flex flex-col lg:flex-row justify-center w-screen p-5 ">
            <form onSubmit={handleSubmit} className="w-2/6 space-y-6 mx-10">
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

            <div>
                <div className="w-96 max-h-[30rem] h-auto p-3 overflow-auto">
                    {cart.length > 0 ? cart.map((book) => (
                        <div key={book.book_id} className="flex justify-between mb-4">
                            <div className="relative flex space-x-4">
                                <div className="w-14 h-20">
                                    <img src={book.image_url} alt={book.title} className="w-full h-full object-cover"/>
                                </div>
                                <div
                                    className="absolute bottom-16 left-6 bg-gray-400 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                                    {book.quantity}
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold">{book.title}</h3>
                                    <p className="text-sm font-light italic">{book.type}</p>
                                </div>
                            </div>
                            <p className="text-base font-light mr-3 mt-1">{book.price}€</p>
                        </div>
                    )) : <p className="text-lg font-semibold">No items in cart</p>}
                </div>
                <div>
                    {cart.length > 0 && (
                        <div className="flex justify-between p-4">
                            <p className="text-sm font-semibold">Total:</p>
                            <p className="text-sm font-semibold">{cart.reduce((acc, book) => acc + book.price * book.quantity, 0)}€</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default OrderPage;