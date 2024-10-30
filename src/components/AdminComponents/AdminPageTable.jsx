import {useEffect, useMemo, useState} from "react";

import {deleteBook, deleteOrder, deleteUser, getOrderById} from "../../utils/api.js";
import {useUserContext} from "../../context/UserContext.jsx";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal.jsx";
import CreateOrUpdateBookModal from "./CreateOrUpdateBookModal.jsx";
import CreateOrUpdateUserModal from "./CreateOrUpdateUserModal.jsx";

const AdminPageTable = ({data}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemId, setItemId] = useState(null);
    const {user} = useUserContext();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dataType = useMemo(() => {
        console.log("entering usememo");
        if (!selectedItem) return "";
        if (selectedItem.isbn) return "book";
        if (selectedItem.orderDate) return "order";
        if (selectedItem.email) return "user";
    }, [selectedItem])


    // Data mapping identifiers for each type
    const bookDataMapIdentifiers = {title: "Title", isbn: "ISBN"};
    const userDataMapIdentifiers = {first_name: "First name", last_name: "Last name", email: "Email"};
    const orderDataMapIdentifiers = {email: "User", orderDate: "Date"};


    let dataMapIdentifiers = {};
    let tableHeaders = [];


    // Check the type of data and set the map and headers accordingly
    if (Array.isArray(data) && data.length > 0) {

        if (data[0].isbn) {
            // if book data
            dataMapIdentifiers = bookDataMapIdentifiers;
            tableHeaders = Object.values(bookDataMapIdentifiers);
        } else if (data[0].email) {
            // if user data
            dataMapIdentifiers = userDataMapIdentifiers;
            tableHeaders = Object.values(userDataMapIdentifiers);
        } else if (data[0].orderDate) {
            // if order data
            dataMapIdentifiers = orderDataMapIdentifiers;
            tableHeaders = Object.values(orderDataMapIdentifiers);
            console.log("order headers: ", tableHeaders);
        }
    }

    useEffect(() => {
        if (selectedItem) {
            const id = selectedItem.book_id || selectedItem.user_id || selectedItem.order_id || null;
            setItemId(id);
        }
    }, [selectedItem]);

    const handleEdit = async (item) => {
        if (dataType === "order") {
            const response = await getOrderById(item.order_id, user.token);
            const formattedOrder = response.data;
            if (formattedOrder) {
                setSelectedItem(formattedOrder);
            } else {
                setSelectedItem(item);
            }
        } else {
            setSelectedItem(item);
        }
        console.log("selected item is ", item);
        console.log("datatype", dataType)

        setIsModalOpen(true);
    }

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
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
                response = await deleteBook(id, user.token);
                break;
            case "user":
                response = await deleteUser(id, user.token);
                break;
            case "order":
                response = await deleteOrder(id, user.token);
                break;
            default:
                console.error("Unknown data type, cannot delete.");
                return;
        }

        if (response && response.success) {
            console.log(`${dataType} with ID ${id} was successfully deleted.`);
            setSuccessMessage(`${dataType} with ID ${id} was successfully deleted.`);
            setTimeout(() => {
                setIsDeleteModalOpen(false);
            }, 2000);
        } else {
            console.error(`Failed to delete ${dataType} with ID ${id}.`);
            console.log("error ", response.error)
            setErrorMessage(`Failed to delete ${dataType} with ID ${id}.`);
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
                            <button className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}
                                    onClick={() => handleDeleteClick(item)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
            {
                (isModalOpen && dataType === "book") &&
                <CreateOrUpdateBookModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    existingBook={selectedItem}
                    book_id={itemId}
                />
            }
            {
                (isModalOpen && dataType === "user") &&
                <CreateOrUpdateUserModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    existingUser={selectedItem}
                    user_id={itemId}
                />
            }
            {
                isDeleteModalOpen && (
                    <AdminDeleteConfirmModal
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        handleDelete={() => handleDelete(selectedItem)}
                        title={selectedItem.title || selectedItem.email || selectedItem.orderDate}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                )
            }
        </>

    )
        ;
}

export default AdminPageTable;