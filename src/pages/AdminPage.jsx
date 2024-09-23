import AdminPanelButton from "../components/AdminPanelButton.jsx";
import AdminPageTable from "../components/AdminPageTable.jsx";
import { fetchBooks, fetchOrders, fetchUsers} from "../utils/api.js";
import {useEffect, useState} from "react";


const AdminPage = () => {


    const [bookData, setBookData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const bookData = await fetchBooks();
            setBookData(bookData);
            // set default data to books
            setTableData(bookData);

            const userData = await fetchUsers();
            setUserData(userData);

            const orderData = await fetchOrders();
            setOrderData(orderData);


        };

        fetchData();
    }, []);


    const showBooks = () => {setTableData(bookData)};
    const showUsers = () => {setTableData(userData)};
    const showOrders = () => {setTableData(orderData)};


  return (
      <div className={"main-content-container flex w-full max-h"}>
            <aside className="admin-side-bar bg-gray-100 px-24 py-40 flex flex-col justify-between max-">
                <AdminPanelButton label="Books" onClick={showBooks} />
                <AdminPanelButton label="Users" onClick={showUsers}/>
                <AdminPanelButton label="Orders" onClick={showOrders}/>
            </aside>
            <div className="table-container grow w-full text-center overflow-y-scroll h-4/5">
                - Table goes here -
                <AdminPageTable data={tableData}/>
            </div>
      </div>
  )
}

export default AdminPage;