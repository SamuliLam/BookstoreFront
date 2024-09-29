import AdminPanelButton from "../components/AdminComponents/AdminPanelButton.jsx";
import AdminPageTable from "../components/AdminComponents/AdminPageTable.jsx";
import {fetchBooks, fetchOrders, fetchUsers} from "../utils/api.js";
import {useContext, useEffect, useState} from "react";
import {SearchResultContext} from "../context/SearchContext.jsx";


const AdminPage = () => {
    console.log("AdminPage");

    const [dataState, setDataState] = useState({
        books: [],
        users: [],
        orders: [],
        tableData: [],
        isLoading: true,
    });

    const {searchResults} = useContext(SearchResultContext);

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
                <AdminPanelButton label="Books" handleClick={() => handleTableDataChange(dataState.books)}/>
                <AdminPanelButton label="Users" handleClick={() => handleTableDataChange(dataState.users)}/>
                <AdminPanelButton label="Orders" handleClick={() => handleTableDataChange(dataState.orders)}/>
            </aside>
            <div className="table-content-container flex-col">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
                    Add New
                </button>
                <div className="table-container overflow-y-scroll p-0 h-5/6 mx-auto">
                    <AdminPageTable data={dataState.tableData}/>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;