import {authorProperties} from "../../../utils/adminModalProperties.js";
import {RenderProperties} from "./RenderProperties.jsx";

const AuthorProperty = ({ name, label, value, type, onInputChange }) => {

    const properties = authorProperties(value);
    console.log(properties);
    return (
        <div className="flex flex-col">
            <h3 className="font-bold ">{label}</h3>
            <RenderProperties tableProperties={properties} onInputChange={onInputChange}/>
        </div>
    )
}

export default AuthorProperty;