import {inventoryProperties} from "../../../utils/adminModalProperties.js";
import {RenderProperties} from "./RenderProperties.jsx";

const InventoryProperty = ({ name, label, value, type, onInputChange }) => {

    const properties = inventoryProperties(value);

    return (
        <div className="flex flex-col">
            <h3 className="font-bold ">{label}</h3>
            <RenderProperties tableProperties={properties} onInputChange={onInputChange} />
        </div>
    )
}

export default InventoryProperty;