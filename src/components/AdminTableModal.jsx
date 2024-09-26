import { useState, useEffect } from "react";
import Modal from "./Modal.jsx";

const AdminTableModal = ({ open, onClose, item}) => {
    const [formData, setFormData] = useState(item || {});

    // Update formData whenever the item prop changes
    useEffect(() => {
        setFormData(item || {});
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Check if the name contains a dot indicating nested structure
        if (name.includes('.')) {
            const keys = name.split('.'); // Split the name by dot
            const updatedFormData = { ...formData };
            updatedFormData[keys[0]][keys[1]] = value; // Update the nested property
            setFormData(updatedFormData);
        } else {
            setFormData({ ...formData, [name]: value });
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
                    {Object.keys(formData).map((key, index) => {
                        // Check if the value is an object
                        if (typeof formData[key] === 'object' && formData[key] !== null) {
                            return (
                                <div key={index} className="flex flex-col">
                                    <label className="font-bold">{key}</label>
                                    {Object.keys(formData[key]).map((nestedKey, nestedIndex) => (
                                        <div key={nestedIndex} className="flex flex-col ml-4">
                                            <label className="font-bold">{nestedKey}</label>
                                            <input
                                                type="text"
                                                name={`${key}.${nestedKey}`}
                                                value={formData[key][nestedKey]}
                                                onChange={handleInputChange}
                                                className="border rounded p-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        }

                        // If not an object, render the input field normally
                        return (
                            <div key={index} className="flex flex-col">
                                <label className="font-bold">{key}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleInputChange}
                                    className="border rounded p-2"
                                />
                            </div>
                        );
                    })}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );


};

export default AdminTableModal;
