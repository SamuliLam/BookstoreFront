export const TextProperty = ({name, disabled, label, value, type, onInputChange}) => {

    const onChange = (e) => {
        let val = type === 'number' ? parseFloat(e.target.value) : e.target.value;
        onInputChange(name, val);
    }

    return (
        <div className="flex flex-col">
            <label className="font-bold">{label}</label>
            <input
                type={type}
                name={name}
                disabled={disabled}
                defaultValue={value}
                onChange={onChange}
                className="border rounded p-2 dark:text-black"
            />
        </div>
    )
}

export default TextProperty;