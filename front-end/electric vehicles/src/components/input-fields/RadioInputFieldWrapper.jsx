import React from 'react';

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
export default RadioInputFieldWrapper
