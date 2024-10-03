import {useEffect, useState} from "react";

import AdminTableModal from "./AdminTableModal.jsx";
import {deleteBook, deleteOrder, deleteUser} from "../../utils/api.js";

const AdminPageTable = ({data}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemId, setItemId] = useState(null);


    // Data mapping identifiers for each type
    const bookDataMapIdentifiers = {title: "Title", isbn: "ISBN"};
    const userDataMapIdentifiers = {first_name: "First name", last_name: "Last name", email: "Email"};
    const orderDataMapIdentifiers = {email: "User", orderDate: "Date"};


    let dataMapIdentifiers = {};
    let tableHeaders = [];
    let dataType;

    // Check the type of data and set the map and headers accordingly
    if (Array.isArray(data) && data.length > 0) {

        if (data[0].isbn) {
            // if book data
            dataMapIdentifiers = bookDataMapIdentifiers;
            tableHeaders = Object.values(bookDataMapIdentifiers);
            dataType = "book";
        } else if (data[0].email) {
            // if user data
            dataMapIdentifiers = userDataMapIdentifiers;
            tableHeaders = Object.values(userDataMapIdentifiers);
            dataType = "user";
        } else if (data[0].orderDate) {
            // if order data
            dataMapIdentifiers = orderDataMapIdentifiers;
            tableHeaders = Object.values(orderDataMapIdentifiers);
            dataType = "order";
            console.log("order headers: ", tableHeaders);
        }
    }

    useEffect(() => {
        if (selectedItem) {
            const id = selectedItem.book_id || selectedItem.user_id || selectedItem.order_id || null;
            setItemId(id);
        }
    }, [selectedItem]);

    const handleEdit = (item) => {
        setSelectedItem(item);
        console.log("selected item is ", item);
        setIsModalOpen(true);
    }

    const handleDelete = async (item) => {
        const id = item.book_id || item.user_id || item.order_id;
        if (!id) {
            console.error("No valid ID found for the item.");
            return;
        }

        let response;
        switch (dataType) {
            case "book":
                response = await deleteBook(id);
                break;
            case "user":
                response = await deleteUser(id);
                break;
            case "order":
                response = await deleteOrder(id);
                break;
            default:
                console.error("Unknown data type, cannot delete.");
                return;
        }

        if (response && response.success) {
            console.log(`${dataType} with ID ${id} was successfully deleted.`);
        } else {
            console.error(`Failed to delete ${dataType} with ID ${id}.`);
        }
    };


    return (
        <>
            <table className="text-center">
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th className={"p-5"} key={index}>{header}</th>
                    ))}
                    <th className={"p-5"}>Edit</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (

                    <tr key={index}>
                        {Object.keys(dataMapIdentifiers).map((key, i) => {
                            if (key === 'email' && item.user) {
                                return <td className={"py-5 px-20"} key={i}>{item.user.email}</td>;
                            }

                            if (key === 'orderDate') {
                                return <td className={"py-5 px-20"} key={i}>{item.orderDate}</td>;
                            }
                            return <td className={"py-5 px-20"} key={i}>{item[key]}</td>;
                        })}
                        <td className={"p-5"}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleEdit(item)}>
                                Edit
                            </button>
                        </td>
                        <td className={"p-5"}>
                            <button className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"} onClick={() => handleDelete(item)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
            {
                isModalOpen && (
                    <AdminTableModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        item={selectedItem}
                        dataType={dataType}
                        id={itemId}
                    />
                )
            }
        </>

    )
        ;
}

export default AdminPageTable;