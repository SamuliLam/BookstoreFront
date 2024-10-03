import React, {useEffect, useState} from 'react';
import {useUserContext} from "../context/UserContext.jsx";
import {useCartContext} from "../context/CartContext.jsx";
import {updateUserProfile} from "../utils/userApiUtils.js";
import {addOrder, updateInventory} from "../utils/api.js";
import CartButton from "../components/CartButton.jsx";
import OrderAlert from "../components/OrderAlert.jsx";
import {useNavigate} from "react-router-dom";

const OrderPage = () => {
    const navigate = useNavigate();
    const [displayAlert, setDisplayAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const {user} = useUserContext();
    const {cart, addToCart, removeFromCart, clearCart} = useCartContext();
    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        street_name: user.street_name,
        postal_code: user.postal_code,
        province: user.province,
        phone_number: user.phone_number,
    });
    const [orderSuccess, setOrderSuccess] = useState(false);
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
                        setOrderSuccess(true);
                        setAlertMessage("Order placed successfully");
                        setDisplayAlert(true);
                        setTimeout(() => {
                            navigate("/");
                            clearCart();
                        }, 2000);
                    } else {
                        setOrderSuccess(false);
                        setAlertMessage("Failed to place an order");
                        setDisplayAlert(true);
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (orderSuccess) {
            console.log("Order was successful, updating inventory...");
            const updateInventoryPromises = (cart.map(async (book) => {
                console.log(`Updating inventory for book ID: ${book.book_id} with quantity: ${book.quantity}`);
                console.log("book quantity: ", book.quantity);
                console.log("book id: ", book.book_id);
                let response = await updateInventory(book.book_id, book.quantity, user.token, book.book_condition);
                console.log("response: ", response);
                return response;
            }));
            updateInventoryPromises.forEach((promise) => {
                promise.then((response) => {
                    console.log("Inventory update response: ", response);
                });
            });
        }
    }, [orderSuccess, cart, user.token]);


    return (
        <div className="w-screen flex flex-col-reverse p-5 lg:justify-center lg:items-start lg:flex-row ">
            <form onSubmit={handleSubmit} className="w-5/6 sm:w-2/4 lg:w-1/3 space-y-6 lg:mx-10 my-0 m-auto">
                <h2 className="text-xl font-bold dark:text-white">Recipient Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                    className={`bg-blue-500 text-white py-3 rounded-md w-full sm:w-1/4 md:w-1/3 mx-auto block text-center ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    disabled={cart.length === 0}
                >
                    Confirm Order
                </button>
            </form>

            <div className="w-5/6 sm:w-2/4 lg:w-1/3 space-y-6 lg:mx-10 my-0 m-auto">
                <div className="max-h-[30rem] h-auto p-3 overflow-auto dark:text-white">
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
                                    <p className="text-base font-light mr-3 mt-1">{book.price}€</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-1">
                                <CartButton onClick={() => addToCart(book)} type="add"/>
                                <CartButton onClick={() => removeFromCart(book)} type="remove"/>
                            </div>
                        </div>
                    )) : <p className="text-lg font-semibold">No items in cart</p>}
                </div>
                <div>
                    {cart.length > 0 && (
                        <div className="w-full flex justify-between p-4 dark:text-white">
                            <p className="text-sm font-semibold">Total:</p>
                            <p className="text-sm font-semibold">{cart.reduce((acc, book) => acc + book.price * book.quantity, 0)}€</p>
                        </div>
                    )}
                </div>
                {displayAlert && <OrderAlert status={orderSuccess} message={alertMessage}/>}
            </div>
        </div>
    );
};


export default OrderPage;