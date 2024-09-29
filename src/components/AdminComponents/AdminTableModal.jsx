import {useEffect, useState} from "react";
import Modal from "./Modal.jsx";
import {properties} from "../../utils/adminModalProperties.js";
import {RenderProperties} from "./Properties/RenderProperties.jsx";
import {updateBook, updateInventory} from "../../utils/api.js";
import {updateUserProfile} from "../../utils/userApiUtils.js";
import {useUserContext} from "../../context/UserContext.jsx";


const AdminTableModal = ({open, onClose, item, dataType, id}) => {
    const {user} = useUserContext();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const initialFormData = {};
        const tableProperties = properties(item);
        tableProperties.forEach((property) => {
            initialFormData[property.name] = property.value;
        });
        setFormData(initialFormData);
    }, [item]);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const allowedFieldsMap = {
        book: ["title", "isbn", "author", "price", "quantity", "genre", "type", "publication_year", "book_condition", "image_url"],
        user: ["email", "password", "first_name", "last_name", "street_number", "street_name", "province", "postal_code", "phone_number", "role"],
        inventory: ["quantity"],
        order: ["order_date", "total"]
    };

    const endpointMap = {
        "book": updateBook,
        "user": updateUserProfile,
        "inventory": updateInventory,
        "order": null
    }



    const filterFormData = (FormObject, allowedFields) => {
        return Object.fromEntries(
            Object.entries(FormObject).filter(([key]) => allowedFields.includes(key))
        );
    };

    const handleInputChange = (name, value) => {
        const numericFields = ["street_number", "postal_code"];

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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const allowedFields = allowedFieldsMap[dataType] || [];
        const filteredFormData = filterFormData(formData, allowedFields);

        if (endpointMap[dataType]){
            endpointMap[dataType](id, filteredFormData, user.token);
        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col space-y-4">
                    <RenderProperties tableProperties={properties(item)} onInputChange={handleInputChange}/>
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