
export const BooleanProperty = ({name, label, value, type, onInputChange, required}) => {
    return (
        <div className="flex flex-col">
            <label className="font-bold dark:text-white">{label}</label>
            <input
                type={"checkbox"}
                name={name}
                defaultValue={value}
                onChange={(e) => onInputChange(e.target.checked)}
                required={required}
            />
        </div>
    )
}

export default BooleanProperty;
