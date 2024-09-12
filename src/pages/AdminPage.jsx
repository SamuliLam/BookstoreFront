import AdminPanelButton from "../components/AdminPanelButton.jsx";

const AdminPage = () => {
  return (
      <div className={"main-content-container h-full"}>
            <aside className="bg-gray-500 h-full px-24 py-40 flex flex-col justify-between">
                <AdminPanelButton label="Books" />
                <AdminPanelButton label="Users" />
                <AdminPanelButton label="Orders" />
                <AdminPanelButton label="Authors" />
            </aside>
      </div>
  )
}

export default AdminPage;