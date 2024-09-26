import {useState} from "react";

import AdminTableModal from "./AdminTableModal.jsx";

const AdminPageTable = ({data}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Data mapping identifiers for each type
    const bookDataMapIdentifiers = {title: "Title", isbn: "ISBN"};
    const userDataMapIdentifiers = {first_name: "First name", last_name: "Last name", email: "Email"};
    const orderDataMapIdentifiers = {email: "User", orderDate: "Date"};

    // Check if data is not null or undefined

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


    const handleEdit = (item) => {
        console.log("editing item: ", item);
        let formattedItem;

        if (item.isbn) {
            formattedItem = {
                Title: item.title,
                ISBN: item.isbn,
                Genre: item.genre,
                Type: item.type,
                PublishYear: item.publication_year,
                Price: item.price,
                "Condition": item.book_condition,
                Inventory: {
                    NewStock: item.inventory.stock_level_new,
                    UsedStock: item.inventory.stock_level_used,
                }}
        } else if (item.email) {
            formattedItem = {
                "First name": item.first_name,
                "Last name": item.last_name,
                "Email": item.email,
                "Password": item.password,
                "StreetName": item.street_name,
                "StreetNumber": item.street_number,
                "Phone": item.phone_number,
                "PostalCode": item.postal_code,
                "Province": item.province,
                "Role": item.role
            }
        } else if (item.orderDate) {
            formattedItem = {
                "User": item.user.email,
                "Date": item.orderDate,
                "Total": item.total,
                "Products": item.orderItems.map((product) => ({
                    "Title": product.book.title,
                    "ISBN": product.book.isbn,
                    "Quantity": product.quantity,
                    "Price": product.price
                }))
            }
        }


        setSelectedItem(formattedItem);
        console.log("selected item: ", formattedItem);
        setIsModalOpen(true);
    }

    return (
        <>
            <table className="w-3/4 text-center">
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
                                return <td className={"p-5"} key={i}>{item.user.email}</td>;
                            }

                            if (key === 'orderDate') {
                                return <td className={"p-5"} key={i}>{item.orderDate}</td>;
                            }

                            return <td className={"p-5"} key={i}>{item[key]}</td>;
                        })}
                        <td className={"p-5"}>
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
                />
            )}
        </>

    );
}

export default AdminPageTable;