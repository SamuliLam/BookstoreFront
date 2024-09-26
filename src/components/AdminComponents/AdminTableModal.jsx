// InputField component for rendering single input fields
import React from "react";
import Modal from "./Modal.jsx";
import {InputField} from "./InputField.jsx";
import {ProductFieldsContainer} from "./ProductFieldsContainer.jsx";
import {InventoryFieldsContainer} from "./InventoryFieldsContainer.jsx";

const AdminTableModal = ({open, onClose, item, headers}) => {
    const [formData, setFormData] = React.useState(item || {});

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        // Check for array or nested object structure
        const arrayMatch = name.match(/(.*)\[(\d+)\]\.(.*)/);
        if (arrayMatch) {
            const [, parentKey, index, childKey] = arrayMatch;
            const updatedFormData = {...formData};
            if (updatedFormData[parentKey] && Array.isArray(updatedFormData[parentKey])) {
                updatedFormData[parentKey][index][childKey] = value;
            }
            setFormData(updatedFormData);
        } else if (name.startsWith('Inventory.')) {
            const key = name.replace('Inventory.', '');
            setFormData({...formData, Inventory: {...formData.Inventory, [key]: value}});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col space-y-4">
                    {/* Top-level fields */}
                    {Object.keys(formData).map((key, index) => {
                        if (key === "Products" && Array.isArray(formData[key])) {
                            return (
                                <div key={index} className="flex flex-col">
                                    <label className="font-bold">{key}</label>
                                    <ProductFieldsContainer products={formData[key]} onChange={handleInputChange}/>
                                </div>
                            );
                        }

                        if (key === "Inventory") {
                            return (
                                <InventoryFieldsContainer inventory={formData[key]} onChange={handleInputChange} key={index}/>
                            );
                        }

                        return (
                            <InputField
                                key={index}
                                label={key}
                                value={formData[key]}
                                name={key}
                                onChange={handleInputChange}
                            />
                        );
                    })}
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