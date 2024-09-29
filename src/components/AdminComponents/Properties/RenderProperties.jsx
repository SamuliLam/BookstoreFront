import TextProperty from "./TextProperty.jsx";
import InventoryProperty from "./InventoryProperty.jsx";
import OrderItemsProperty from "./OrderItemsProperty.jsx";
import BookProperty from "./BookProperty.jsx";

export const RenderProperties = ({tableProperties, onInputChange}) => {

    const propertiesMap = {
        "text": TextProperty,
        "number": TextProperty,
        "inventory": InventoryProperty,
        "orderItems": OrderItemsProperty,
        "book": BookProperty,
    };

    return (
        tableProperties.map((property) => {
                const PropertyComponent = propertiesMap[property.type];
                if (!PropertyComponent) {
                    return <p key={property.name}>Invalid property type: {property.type}</p>;
                }
                return (
                    <PropertyComponent
                        key={property.name}
                        {...property}
                        update={(value) => onInputChange(property.name, value)}
                    />
                );
            }
        )
    )
}