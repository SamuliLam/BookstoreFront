import { useMemo, useState} from "react";

import AdminTableModal from "./AdminTableModal.jsx";

const AdminPageTable = ({data}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    // Data mapping identifiers for each type
    const bookDataMapIdentifiers = {title: "Title", isbn: "ISBN"};
    const userDataMapIdentifiers = {first_name: "First name", last_name: "Last name", email: "Email"};
    const orderDataMapIdentifiers = {email: "User", orderDate: "Date"};


    let dataMapIdentifiers = {};
    let tableHeaders = [];
    let dataType;

    const itemId = useMemo(() => {
        if (!selectedItem){
            return null;
        }

        if(selectedItem.book_id) {
            return selectedItem.book_id;
        } else if (selectedItem.user_id) {
            return selectedItem.user_id;
        } else if (selectedItem.order_id) {
            return selectedItem.order_id;
        }
    }, [selectedItem]);

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


    const handleEdit = (item, id) => {
        setSelectedItem(item);
        console.log("selected id is: ", id);
        setIsModalOpen(true);
    }
    return (
        <div>
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
</div>

)
    ;
}

export default AdminPageTable;