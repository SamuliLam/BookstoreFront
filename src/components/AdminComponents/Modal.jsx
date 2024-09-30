import React from 'react';

const Modal = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div
            className="modal-container fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 h-1/2 overflow-y-scroll dark:bg-blue-950"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
