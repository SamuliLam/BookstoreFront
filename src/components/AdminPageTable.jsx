import {useState} from "react";
import AdminTableModal from "./AdminTableModal.jsx";

const AdminPageTable = ({data}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Data mapping identifiers for each type
    const bookDataMapIdentifiers = {title: "Title", isbn: "ISBN"};
    const userDataMapIdentifiers = {first_name: "First name", last_name: "Last name", email: "Email"};
    const orderDataMapIdentifiers = {user: "User", date: "Date"};

    // Check if data is not null or undefined





    let dataMapIdentifiers = {};
    let tableHeaders = [];
    let modalHeaders = [];

    // Check the type of data and set the map and headers accordingly
    if (data && data.length > 0) {

        if (data[0].isbn) {
            // if book data
            dataMapIdentifiers = bookDataMapIdentifiers;
            tableHeaders = Object.values(bookDataMapIdentifiers);
            modalHeaders = Object.keys(bookDataMapIdentifiers);

        } else if (data[0].email) {
            // if user data
            dataMapIdentifiers = userDataMapIdentifiers;
            tableHeaders = Object.values(userDataMapIdentifiers);
            modalHeaders = Object.keys(userDataMapIdentifiers);
        } else if (data[0].date) {
            // if order data
            dataMapIdentifiers = orderDataMapIdentifiers;
            tableHeaders = Object.values(orderDataMapIdentifiers);
            modalHeaders = Object.keys(orderDataMapIdentifiers);
        }
    }


    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    }

    return (
        <>
            <table className="w-3/4">
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.book_id || item.user_id || item.order_id}>
                        {Object.keys(dataMapIdentifiers).map((key) => (
                            <td key={key}>{item[key]}</td>
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