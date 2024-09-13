
const AdminPanelButton = ({label}) => {
  return (
      //TODO: change hover color
    <button className="admin-panel-button rounded-lg py-2 px-12 border-2 hover:bg-amber-100">{label}</button>
  );
}

export default AdminPanelButton;