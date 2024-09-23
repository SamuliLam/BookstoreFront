import {useState} from "react";
import AdminTableModal from "./AdminTableModal.jsx";

const AdminPageTable = ({data}) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Data mapping identifiers for each type
    const bookDataMapIdentifiers = {title: "Title", isbn: "ISBN"};
    const userDataMapIdentifiers = {first_name: "First name", last_name: "Last name", email: "Email"};
    const orderDataMapIdentifiers = {user: "User", date: "Date"};

    const modalHeaders = Object.keys(data[0]);

    let dataMapIdentifiers = {};
    let tableHeaders = [];

    // Check the type of data and set the map and headers accordingly
    if (data[0].isbn) {
        // if book data
        dataMapIdentifiers = bookDataMapIdentifiers;
        tableHeaders = Object.values(bookDataMapIdentifiers);
    } else if (data[0].email) {
        // if user data
        dataMapIdentifiers = userDataMapIdentifiers;
        tableHeaders = Object.values(userDataMapIdentifiers);
    } else if (data[0].date) {
        // if order data
        dataMapIdentifiers = orderDataMapIdentifiers;
        tableHeaders = Object.values(orderDataMapIdentifiers);
    }

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    }

    return (
        <>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.keys(dataMapIdentifiers).map((key, i) => (
                            <td key={i}>{item[key]}</td>
                        ))}
                        <td>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleEdit(item)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isModalOpen && (
                <AdminTableModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    item={selectedItem}
                    headers={modalHeaders}
                />
            )}
        </>

    );
}

export default AdminPageTable;