import {useState} from "react";
import Modal from "./Modal.jsx";

const AdminTableModal = ({ open, onClose, item, headers}) => {
    const [formData, setFormData] = useState(item || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col space-y-4">
                    {headers.map((key) => (
                        <div key={key} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                                {key}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key] || ''}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    ))}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );

}

export default AdminTableModal;