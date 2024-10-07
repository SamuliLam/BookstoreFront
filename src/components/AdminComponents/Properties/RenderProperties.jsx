import TextProperty from "./TextProperty.jsx";
import ArrayProperty from "./ArrayProperty.jsx";
import BooleanProperty from "./BooleanProperty.jsx";

export const RenderProperties = ({value, name, onInputChange}) => {

    const propertiesMap = {
        "text": TextProperty,
        "number": TextProperty,
        "object": RenderProperties,
        "boolean": BooleanProperty,
        "array": ArrayProperty
        /*
                "inventory": InventoryProperty,
                "authors": AuthorProperty,
                "publisher": PublisherProperty,
                "orderItems": OrderItemsProperty,
                "book": BookProperty,
        */
    };

    const onUpdate = (property, newValue) => {
        if (!name) {
            onInputChange(property, newValue);
            return;
        }

        const val = {
            [property]: newValue
        };
        onInputChange(name, val)
    }

    return (
        console.log("value:", value),
            (value || []).map((property) => {
                const PropertyComponent = propertiesMap[property.type];
                if (!PropertyComponent) {
                    return <p key={property.name}>Invalid property type: {property.type}</p>;
                }
                return (
                    <PropertyComponent
                        key={property.name}
                        className="dark:text-white"
                        {...property}
                        onInputChange={(name, pValue) => onUpdate(name, pValue)}
                    />
                );
            }
        )
    )
}