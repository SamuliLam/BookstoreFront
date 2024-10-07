import {useEffect, useMemo, useState} from "react";
import Modal from "./Modal.jsx";
import {properties} from "../../utils/adminModalProperties.js";
import {RenderProperties} from "./Properties/RenderProperties.jsx";
import {updateBook, updateInventory, updateUser} from "../../utils/api.js";
import {useUserContext} from "../../context/UserContext.jsx";


const AdminTableModal = ({open, onClose, item, dataType, id}) => {
    const {user} = useUserContext();
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const initialFormData = {};
        const tableProperties = properties(item, dataType);
        console.log("table properties:", tableProperties);
        tableProperties.forEach((property) => {
            initialFormData[property.name] = property.value;
        });
        setFormData(initialFormData);
    }, [item]);

    useEffect(() => {
        console.log("form data:", formData);
    }, [formData]);



    const endpointMap = {
        "book": updateBook,
        "user": updateUser,
        "inventory": updateInventory,
        "order": null
    }

    const handleInputChange = (name, value) => {
        setFormData((prevData) => {
            return {
                ...prevData, [name]: value,
            };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const allowedFields = allowedFieldsMap[dataType] || [];
        const filteredFormData = filterFormData(formData, allowedFields);

        try {
            if (endpointMap[dataType]) {
                const response = await endpointMap[dataType](id, filteredFormData, user.token);
                if (response.status !== 200) {
                    setErrorMessage("Failed to update item");
                    setSuccessMessage("");
                } else {
                    setSuccessMessage("Item updated successfully");
                    setErrorMessage("");
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                }
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred");
            setSuccessMessage("");
            console.error("Error updating item", error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col space-y-4 dark:bg-blue-950 dark:text-white dark:placeholder-gray-500">
                    <RenderProperties tableProperties={properties(item, dataType)} onInputChange={handleInputChange}/>
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


export default AdminTableModal;