import AdminPanelButton from "../components/AdminPanelButton.jsx";
import AdminPageTable from "../components/AdminPageTable.jsx";
import { fetchBooks, fetchOrders, fetchUsers} from "../utils/api.js";
import {useEffect, useState} from "react";


const AdminPage = () => {
    console.log("AdminPage");

    const [bookData, setBookData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await fetchBooks();
                const users = await fetchUsers();
                const orders = await fetchOrders();

                setBookData(books);
                setUserData(users);
                setOrderData(orders);
                setTableData(books);
                setIsLoading(false);

            } catch (error) {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTableDataChange = (data) => {
        console.log("changing data to: ", data);
        setTableData(data);
    }

    if (isLoading) {
        return <div className={"m-auto"}>Loading...</div>;
    }



  return (
      <div className={"main-content-container flex grow"}>
            <aside className="admin-side-bar bg-gray-100 px-24 py-40 flex flex-col justify-between">
                <AdminPanelButton label="Books" handleClick={() => handleTableDataChange(bookData)} />
                <AdminPanelButton label="Users" handleClick={() => handleTableDataChange(userData)}/>
                <AdminPanelButton label="Orders" handleClick={() => handleTableDataChange(orderData)}/>
            </aside>
            <div className="table-container grow text-center overflow-y-scroll flex justify-center">
                <AdminPageTable data={tableData}/>
            </div>
      </div>
  )
}

export default AdminPage;