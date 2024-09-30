import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import { addBook, addUser, addOrder } from "../../utils/api.js";
import { properties } from "../../utils/adminModalProperties.js";
import { useUserContext } from "../../context/UserContext.jsx";
import { RenderProperties } from "./Properties/RenderProperties.jsx";

const NewItemModal = ({ open, onClose, dataType }) => {
    const { user } = useUserContext();
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleInputChange = (name, value) => {
        const numericFields = ["publication_year", "price", "quantity", "street_number", "postal_code"];

        setFormData((prevData) => {
            let parsedValue = value;
            if (numericFields.includes(name)) {
                parsedValue = parseInt(value, 10) || value;
            }

            return {
                ...prevData,
                [name]: parsedValue,
            };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Form is being submitted");

        try {
            console.log("Sending fetch request with data:", formData);
            console.log("dataType:", dataType);
            let response;
            if (dataType === "book") {
                console.log("Adding book");
                response = await addBook(formData, user.token);
            } else if (dataType === "user") {
                response = await addUser(formData, user.token);
            } else if (dataType === "inventory") {
                response = await addOrder(formData, user.token);
            }

            console.log("Fetch response:", response);

            if (response && response.success === false) {
                setErrorMessage("Failed to create item");
                setSuccessMessage("");
            } else {
                setSuccessMessage("Item created successfully");
                console.log("Item created successfully");
                setErrorMessage("");
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred");
            setSuccessMessage("");
            console.error("Error creating item", error);
        }
    };


    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col space-y-4 dark:bg-blue-950 dark:text-white dark:placeholder-gray-500">
                    <RenderProperties tableProperties={properties(null, dataType)} onInputChange={handleInputChange}/>
                    {successMessage && (
                        <div className="text-green-500 font-semibold">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="text-red-500 font-semibold">
                            {errorMessage}
                        </div>
                    )}
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default NewItemModal;