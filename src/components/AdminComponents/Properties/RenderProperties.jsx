import TextProperty from "./TextProperty.jsx";
import InventoryProperty from "./InventoryProperty.jsx";

export const RenderProperties = ({tableProperties}) => {

    const propertiesMap = {
        "text": TextProperty,
        "inventory": InventoryProperty,
    }

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
                    />
                );
            }
        )
    )
}