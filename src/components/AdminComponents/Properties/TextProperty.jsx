export const TextProperty = ({name, label, value, type, update}) => {
    return (
        <div className="flex flex-col">
            <label className="font-bold">{label}</label>
            <input
                type={type}
                name={name}
                defaultValue={value}
                onChange={(e) => update(e.target.value)}
                className="border rounded p-2"
            />
        </div>
    )
}

export default TextProperty;