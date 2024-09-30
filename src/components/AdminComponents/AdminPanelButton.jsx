
const AdminPanelButton = ({label, handleClick}) => {
  return (
    <button className="admin-panel-button bg-gray-200 rounded-lg py-2 px-12 border-2 hover:bg-gray-300 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-300" onClick={handleClick}>{label}</button>
  );
}

export default AdminPanelButton;