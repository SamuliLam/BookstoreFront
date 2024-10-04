import Modal from "./Modal.jsx";

const AdminDeleteConfirmModal = ({ open, onClose, handleDelete, title, successMessage, errorMessage }) => {
    if (!open) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header text-center">
                    <h5 className="modal-title font-bold">Confirm Delete</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete {title}?</p>
                </div>
                <div className="modal-footer flex gap-4 justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
                        Close
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
                {successMessage && (
                    <div className="text-green-500 font-semibold">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="text-red-500 font-semibold">
                        {errorMessage}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AdminDeleteConfirmModal;
