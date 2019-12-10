import React from 'react';
import PropTypes from 'prop-types';

const RadioInputFieldWrapper = ({ children, name, label }) => {
    return (
        <React.Fragment>
            <label htmlFor={name}>{label}</label>
            <div id={name}>
                {children}
            </div>
        </React.Fragment>
    )
}

RadioInputFieldWrapper.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
}

export default RadioInputFieldWrapper
