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

    console.log(item);

    const allowedFieldsMap = {
        book: ["title", "isbn", "author", "price", "quantity", "genre", "type", "publication_year", "book_condition", "image_url"]
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
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const allowedFields = allowedFieldsMap[dataType] || [];
        const filteredFormData = filterFormData(formData, allowedFields);

        if (endpointMap[dataType]){
            endpointMap[dataType](filteredFormData, user.token, id);
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