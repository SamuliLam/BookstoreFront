const AdminPageTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    // Data mapping identifiers for each type
    const bookDataMapIdentifiers = { title: "Title", isbn: "ISBN" };
    const userDataMapIdentifiers = { first_name: "First name", last_name: "Last name", email: "Email" };
    const orderDataMapIdentifiers = { user: "User", date: "Date" };

    let dataMapIdentifiers = {};
    let tableHeaders = [];

    // Check the type of data and set the map and headers accordingly
    if (data[0].isbn) {
        // if book data
        dataMapIdentifiers = bookDataMapIdentifiers;
        tableHeaders = Object.values(bookDataMapIdentifiers);
    } else if (data[0].email) {
        // if user data
        dataMapIdentifiers = userDataMapIdentifiers;
        tableHeaders = Object.values(userDataMapIdentifiers);
    } else if (data[0].date) {
        // if order data
        dataMapIdentifiers = orderDataMapIdentifiers;
        tableHeaders = Object.values(orderDataMapIdentifiers);
    }

    return (
        <table className="table-auto w-full">
            <thead>
            <tr>
                {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {Object.keys(dataMapIdentifiers).map((key, i) => (
                        <td key={i}>{item[key]}</td>
                    ))}
                    <td>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={}>
                            Edit
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default AdminPageTable;