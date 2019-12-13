import React from 'react';
import PropTypes from 'prop-types';

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

SelectInputfield.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array
}

export default SelectInputfield