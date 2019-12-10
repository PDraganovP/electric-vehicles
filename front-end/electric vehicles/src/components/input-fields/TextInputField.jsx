import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

const TextInputField = ({ name, label, placeholder, type, disabled }) => {

    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <Field type={type}/* "text" */ name={name} className="form-control" id={name} aria-describedby={name} placeholder={placeholder} disabled={disabled} />
            </div>
            <ErrorMessage name={name} component="div"
                style={{ color: 'red' }} />
        </React.Fragment>
    )
}

TextInputField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    placehholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
}

TextInputField.propsDefault = {
    type: 'text'
}

export default TextInputField