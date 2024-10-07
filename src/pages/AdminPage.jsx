import AdminPanelButton from "../components/AdminComponents/AdminPanelButton.jsx";
import AdminPageTable from "../components/AdminComponents/AdminPageTable.jsx";
import {fetchBooks, fetchOrders, fetchUsers} from "../utils/api.js";
import {useContext, useEffect, useState} from "react";
import {SearchResultContext} from "../context/SearchContext.jsx";
import AdminTableModal from "../components/AdminComponents/AdminTableModal.jsx";
import NewBookModal from "../components/AdminComponents/CreateOrUpdateBookModal.jsx";
import { isTokenExpired } from '../utils/api';

const AdminPage = () => {
    console.log("AdminPage");

    const [dataState, setDataState] = useState({
        books: [],
        users: [],
        orders: [],
        tableData: [],
        isLoading: true,
    });


    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [modalDataType, setModalDataType] = useState(""); // State to manage the type of d
    const [currentDataType, setCurrentDataType] = useState(""); // New state to track which type is currently being viewed



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
                setCurrentDataType("book"); // Default to "book" when data loads

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


    const handleTableDataChange = (data, dataType) => {
        console.log("changing data to: ", data);
        setDataState((prevState) => ({
            ...prevState,
            tableData: data,
        }));
        setCurrentDataType(dataType); // Set the current data type based on what is displayed
    }

    const handleAddNewClick = () => {
        setModalDataType(currentDataType);
        setIsModalOpen(true);
    }

    if (dataState.isLoading) {
        return <div className={"m-auto"}>Loading...</div>;
    }


    return (
        <div className={"main-content-container flex grow "}>
            <aside className="admin-side-bar bg-gray-100 px-24 py-40 flex flex-col justify-between dark:text-white dark:bg-gray-900">
                <AdminPanelButton label="Books" handleClick={() => handleTableDataChange(dataState.books)}/>
                <AdminPanelButton label="Users" handleClick={() => handleTableDataChange(dataState.users)}/>
                <AdminPanelButton label="Orders" handleClick={() => handleTableDataChange(dataState.orders)}/>
            </aside>
            <div className="table-content-container flex-col dark:text-white dark:bg-gray-700">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4" onClick={handleAddNewClick}>
                    Add New
                </button>
                <div className="table-container overflow-y-scroll p-0 h-5/6 mx-auto">
                    <AdminPageTable data={dataState.tableData}/>
                </div>
            </div>
            {isModalOpen && (
                <NewBookModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}

export default AdminPage;