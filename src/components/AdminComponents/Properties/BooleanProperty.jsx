
export const BooleanProperty = ({name, label, value, type, onInputChange}) => {
    return (
        <div className="flex flex-col">
            <label className="font-bold">{label}</label>
            <input
                type={"checkbox"}
                name={name}
                defaultValue={value}
                onChange={(e) => onInputChange(e.target.checked)}
            />
        </div>
    )
}

export default BooleanProperty;
