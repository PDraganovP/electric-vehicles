import React from 'react';

const SelectInputfield = ({ options, label, name, id, className }) => {

    return (
        <div className="col">
            <div className="form-group">
                <label htmlFor={id}><span className={className}></span>{label}</label>
                <select id={id} className="form-control" name={name}>
                    {options}
                </select>
            </div>
        </div>
    )
}

export default SelectInputfield