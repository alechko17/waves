import React from "react";


const DropDown = (props) => {

    return (
        <div className="sorting flex justifyContent-end" >
            {props.label && (
                <label>{props.label}</label>
            )}
            
            <select onChange={(e) => props.onChange(e.target.value)}>
                {props.data && props.data.map((option , key) => (
                    <option value={option.key} key={key}>{option.name}</option>
                ))}
            </select>
        </div>
    )
    
};

export default DropDown;