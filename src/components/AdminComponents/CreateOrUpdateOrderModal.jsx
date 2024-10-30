import {useState} from "react";
import Modal from "./Modal.jsx";
import TextProperty from "./Properties/TextProperty.jsx";
import {t} from "i18next";


const CreateOrUpdateOrderModal = ({open, onClose, existingOrder, order_id}) => {

    const [orderDate, setOrderDate] = useState(existingOrder?.orderDate || '');
    const [total, setTotal] = useState(existingOrder?.total || 0);
    const [orderItems, setOrderItems] = useState(existingOrder?.orderItems || [{}]);


    const updateOrderItems = (index, property, value) => {
        setOrderItems((prev) => {
            let orderItem = prev[index];
            orderItem[property] = value;
            return prev;
        })
    }

    return (
        <Modal open={open} onClose={onClose}>
            <form>
                <h3 className={"font-bold text-2xl my-2 dark:text-white"}>{t("CreateOrUpdateOrderModalOrder")}</h3>
                <TextProperty value={orderDate} disabled={true} type={"text"} label={t("CreateOrUpdateOrderModalOrderDate")} name={"orderDate"}
                              onInputChange={(_, value) => setOrderDate(value)}/>
                <TextProperty value={total} disabled={true} type={"number"} label={t("CreateOrUpdateOrderModalOrderTotal")} name={"total"}
                              onInputChange={(_, value) => setTotal(value)}/>
                <h3 className={"font-bold text-2xl my-2 dark:text-white"}>{t("CreateOrUpdateOrderModalOrderedProducts")}</h3>
                {orderItems.map((item, index) => (
                    <div key={index} className={"flex flex-col"}>
                        <h2 className={"font-bold text-xl my-2 dark:text-white"}>{`${t("CreateOrUpdateOrderModalProduct")} ${index + 1}`}</h2>
                        <TextProperty value={item.book.title} disabled={true} type={"text"} label={"Title"}
                                      name={"title"}
                                      onInputChange={(_, value) => updateOrderItems(index, "product_id", value)}/>
                        <TextProperty value={item.quantity} disabled={true} type={"number"} label={t("CreateOrUpdateOrderModalProductQuantity")}
                                      name={"quantity"}
                                      onInputChange={(_, value) => updateOrderItems(index, "quantity", value)}/>
                        <TextProperty value={item.book.isbn} disabled={true} type={"text"} label={t("CreateOrUpdateOrderModalProductISBN")} name={"isbn"}
                                        onInputChange={(_, value) => updateOrderItems(index, "isbn", value)}/>
                        <TextProperty value={item.price} disabled={true} type={"number"} label={t("CreateOrUpdateOrderModalProductPrice")} name={"price"}
                                      onInputChange={(_, value) => updateOrderItems(index, "price", value)}/>
                    </div>
                ))}
                <div className={"form-buttons-container mt-3 flex justify-center"}>

                    <button onClick={onClose}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {t("CreateOrUpdateOrderModalClose")}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateOrUpdateOrderModal;