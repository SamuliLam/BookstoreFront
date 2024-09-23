const AdminPageTable = ({data}) => {

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const bookDataTableHeaderIdentifiers = ["Title", "ISBN", "Edit"];
    const userDataTableHeaderIdentifiers = ["First name", "Last name", "Email", "Edit"];
    const orderDataTableHeaderIdentifiers = ["User", "Date", "Edit"];
    const authorDataTableHeaderIdentifiers = ["First name", "Last name", "Edit"];


    const bookDataTableRowIdentifiers = ["ID", "Title", "ISBN", "Genre", "Type", "Publication year", "Price", "Book condition", "Reserved", "Inventory", "Publisher", "Image URL"]
    const userDataTableRowIdentifiers = ["ID", "First name", "Last name", "Street number", "Street name", "Phone", "Postal code", "Province", "Password", "Role", "Email"];
    const orderDataTableRowIdentifiers = ["ID", "Date", "Total", "User"];
    const authorDataTableRowIdentifiers = ["ID", "First name", "Last name"]

    let tableHeaders = [];
    let tableRowIdentifiers = [];

    if (data[0].isbn) {
        tableHeaders = bookDataTableHeaderIdentifiers;
        tableRowIdentifiers = bookDataTableRowIdentifiers;
    } else if (data[0].phone) {
        tableHeaders = userDataTableHeaderIdentifiers;
        tableRowIdentifiers = userDataTableRowIdentifiers;
    } else if (data[0].total) {
        tableHeaders = orderDataTableHeaderIdentifiers;
        tableRowIdentifiers = orderDataTableRowIdentifiers;
    } else if (data[0].last_name) {
        tableHeaders = authorDataTableHeaderIdentifiers;
        tableRowIdentifiers = authorDataTableRowIdentifiers;
    }

    return (
        <table className="table-auto w-full">
            <thead>
            <tr>
                {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {tableRowIdentifiers.map((identifier, i) => (
                        <td key={i}>{item[identifier]}</td>
                    ))}
                    <td>
                        <button>Edit</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default AdminPageTable;