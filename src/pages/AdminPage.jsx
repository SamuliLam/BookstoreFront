import AdminPanelButton from "../components/AdminPanelButton.jsx";
import AdminPageTable from "../components/AdminPageTable.jsx";
import { fetchBooks, fetchOrders, fetchUsers} from "../utils/api.js";
import {useEffect, useState} from "react";


const AdminPage = () => {
    console.log("AdminPage");

    const [dataState, setDataState] = useState({
        books: [],
        users: [],
        orders: [],
        tableData: [],
        isLoading: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await fetchBooks();
                const users = await fetchUsers();
                const orders = await fetchOrders();

                setDataState({
                    books,
                    users,
                    orders,
                    tableData: books,
                    isLoading: false,
                });

            } catch (error) {
                console.error("Error fetching data: ", error);
                setDataState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));
            }
        };

        fetchData();
    }, []);


    const handleTableDataChange = (data) => {
        console.log("changing data to: ", data);
        setDataState((prevState) => ({
            ...prevState,
            tableData: data,
        }));
    }

    if (dataState.isLoading) {
        return <div className={"m-auto"}>Loading...</div>;
    }


  return (
      <div className={"main-content-container flex grow"}>
            <aside className="admin-side-bar bg-gray-100 px-24 py-40 flex flex-col justify-between">
                <AdminPanelButton label="Books" handleClick={() => handleTableDataChange(dataState.books)} />
                <AdminPanelButton label="Users" handleClick={() => handleTableDataChange(dataState.users)}/>
                <AdminPanelButton label="Orders" handleClick={() => handleTableDataChange(dataState.orders)}/>
            </aside>
            <div className="table-container grow text-center overflow-y-scroll flex justify-center">
                <AdminPageTable data={dataState.tableData}/>
            </div>
      </div>
  )
}

export default AdminPage;