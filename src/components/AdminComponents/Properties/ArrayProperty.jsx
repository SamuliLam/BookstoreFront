import React from 'react';
import {RenderProperties} from "./RenderProperties.jsx";

const ArrayProperty = ({name, label, value, type, onInputChange}) => {

    const onUpdate = (index, pName, newValue) => {
        let newObject = {};
        const others = value[index].map((e) => {
            return newObject[e.name] = e.value

        });

        newObject[pName] = newValue;
        const newVal = [newObject];
        onInputChange(name, newVal)
    }

    return (
        <div className="flex flex-col">
            <label className="font-bold">{label}</label>
            {
                value.map((item, index) => {
                    return <RenderProperties value={item} onInputChange={(pName, newValue) => onUpdate(index, pName, newValue)}/>
                })
            }
        </div>
    );
};

export default ArrayProperty;