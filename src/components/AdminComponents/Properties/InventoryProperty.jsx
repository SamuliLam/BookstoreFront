import TextProperty from "./TextProperty.jsx";
import {inventoryProperties} from "../../../utils/adminModalProperties.js";
import {RenderProperties} from "./RenderProperties.jsx";

const InventoryProperty = ({ name, label, value, type }) => {

    const properties = inventoryProperties(value);

    return (
        <div className="flex flex-col">
            <h3 className="font-bold">{label}</h3>
            <RenderProperties tableProperties={properties} />
        </div>
    )
}

export default InventoryProperty;