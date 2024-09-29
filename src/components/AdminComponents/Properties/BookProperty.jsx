import {RenderProperties} from "./RenderProperties.jsx";
import { orderBookProperties} from "../../../utils/adminModalProperties.js";

const BookProperty = ({ name, label, value, type }) => {

    const properties = orderBookProperties(value);

    return (
        <div className="flex flex-col">
            <h3 className="font-bold">{label}</h3>
            <RenderProperties tableProperties={properties} />
        </div>
    )
}

export default BookProperty;