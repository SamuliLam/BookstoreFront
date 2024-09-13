import AdminPanelButton from "../components/AdminPanelButton.jsx";
import AdminPageTable from "../components/AdminPageTable.jsx";
import {fetchAuthors, fetchBooks, fetchOrders, fetchUsers} from "../utils/api.js";
import {useEffect, useState} from "react";

const AdminPage = () => {

    const [bookData, setBookData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [authorData, setAuthorData] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // set default data to books
        fetchBooks().then((data) => {
            console.log("bookdata " +data)
            setBookData(data);
        });

        fetchUsers().then((data) => setUserData(data));
        fetchOrders().then((data) => setOrderData(data));
        fetchAuthors().then((data) => setAuthorData(data));

    }, []);

    console.log("bookdata: "+bookData)

    const showBooks = () => {setTableData(bookData)};
    const showUsers = () => {setTableData(userData)};
    const showOrders = () => {setTableData(orderData)};
    const showAuthors = () => {setTableData(authorData)};


  return (
      <div className={"main-content-container h-full flex w-full"}>
            <aside className="bg-gray-500 h-full px-24 py-40 flex flex-col justify-between">
                <AdminPanelButton label="Books" onClick={showBooks} />
                <AdminPanelButton label="Users" onClick={showUsers}/>
                <AdminPanelButton label="Orders" onClick={showOrders}/>
                <AdminPanelButton label="Authors" onClick={showAuthors}/>
            </aside>
            <div className="table-container bg-gray-200 grow w-full text-center">
                - Table goes here -
                <AdminPageTable data={tableData}/>
            </div>
      </div>
  )
}

export default AdminPage;