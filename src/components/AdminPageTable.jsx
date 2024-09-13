const AdminPageTable = ({ data }) => {
    const headers = Object.keys(data[0]);

    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
        </table>
    );
}

export default AdminPageTable;