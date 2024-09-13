const AdminPageTable = ({ data }) => {

    return (
        <table className="table-auto w-full">
            for (let i = 0; i < data.length; i++) {
                <tr>
                    for (let j = 0; j < data[i].length; j++) {
                        <td className="border px-4 py-2">{data[i][j]}</td>
                    }
                </tr>
            }
        </table>
    )
}

export default AdminPageTable;