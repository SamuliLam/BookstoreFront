import {RenderProperties} from "./RenderProperties.jsx";
import {orderItemProperties} from "../../../utils/adminModalProperties.js";

const OrderItemsProperty = ({name, label, value, type}) => {

    console.log(value);

    return (
        <div className="flex flex-col">
            <h3 className="font-bold">{label}</h3>
            {value.map((item, index) => {
                const properties = orderItemProperties(item);
                return (
                    <div key={index} className="mb-4">
                        <RenderProperties tableProperties={properties}/>
                    </div>
                );
            })
            }
        </div>
    )
}

export default OrderItemsProperty;