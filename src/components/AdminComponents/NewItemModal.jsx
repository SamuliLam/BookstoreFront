import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import { addBook, addUser, addOrder, getDummyBook } from "../../utils/api.js"; // Import the function
import { useUserContext } from "../../context/UserContext.jsx";
import { RenderProperties } from "./Properties/RenderProperties.jsx";
import { computedProperties } from "../../utils/adminModalProperties.js";

const NewItemModal = ({ open, onClose, dataType }) => {
    const { user } = useUserContext();
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch dummy book data when modal is opened for books
    useEffect(() => {
        const fetchDummyBook = async () => {
            if (dataType === "book" && open) {
                const result = await getDummyBook(user.token);
                if (result.success) {
                    setFormData(result.data);
                } else {
                    console.error(result.error);
                }
            }
        };

        fetchDummyBook();
    }, [dataType, open, user.token]);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    // Dynamically compute the form fields using computedProperties
    const computedFields = computedProperties(formData);

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

            if (response.success === false) {
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
                    {/* Pass computedFields to RenderProperties */}
                    <RenderProperties value={computedFields} onInputChange={handleInputChange} />

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
