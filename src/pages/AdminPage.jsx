import AdminPanelButton from "../components/AdminComponents/AdminPanelButton.jsx";
import AdminPageTable from "../components/AdminComponents/AdminPageTable.jsx";
import {fetchBooks, fetchOrdersAdmin, fetchUsers} from "../utils/api.js";
import { useEffect, useState} from "react";
import CreateOrUpdateBookModal from "../components/AdminComponents/CreateOrUpdateBookModal.jsx";
import CreateOrUpdateUserModal from "../components/AdminComponents/CreateOrUpdateUserModal.jsx";
import {useTranslation} from "react-i18next";

const AdminPage = () => {
    const { t} = useTranslation();

    const [dataState, setDataState] = useState({
        books: [],
        users: [],
        orders: [],
        tableData: [],
        isLoading: true,
    });


    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [currentDataType, setCurrentDataType] = useState(""); // New state to track which type is currently being viewed


    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await fetchBooks();
                const users = await fetchUsers();
                const orders = await fetchOrdersAdmin();

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
        console.log("changing datatype to: ", dataType)
        setDataState((prevState) => ({
            ...prevState,
            tableData: data,
        }));
        setCurrentDataType(dataType); // Set the current data type based on what is displayed
    }

    const handleAddNewClick = () => {
        console.log("datatype", currentDataType)
        setIsModalOpen(true);
    }

    if (dataState.isLoading) {
        return <div className={"m-auto dark:text-white"}>{t("AdminPageLoading")}</div>;
    }


    return (
        <div className={"main-content-container flex grow "}>
            <aside className="admin-side-bar bg-gray-100 px-24 py-40 flex flex-col justify-between dark:text-white dark:bg-gray-900">
                <AdminPanelButton label={t("AdminPageBooksButton")} handleClick={() => handleTableDataChange(dataState.books, "book")}/>
                <AdminPanelButton label={t("AdminPageUsersButton")} handleClick={() => handleTableDataChange(dataState.users, "user")}/>
                <AdminPanelButton label={t("AdminPageOrdersButton")} handleClick={() => handleTableDataChange(dataState.orders, "order")}/>
            </aside>
            <div className="table-content-container flex-col dark:text-white dark:bg-gray-700 w-full">
                <button id={'admin-add-new'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4" onClick={handleAddNewClick}>
                    {t("AdminPageAddNew")}
                </button>
                <div className="table-container overflow-y-scroll p-0 h-5/6 mx-auto">
                    <AdminPageTable data={dataState.tableData}/>
                </div>
            </div>
            {
                (isModalOpen && currentDataType === "book") &&
                <CreateOrUpdateBookModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            }
            {
                (isModalOpen && currentDataType === "user") &&
                <CreateOrUpdateUserModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            }
        </div>
    )
}

export default AdminPage;