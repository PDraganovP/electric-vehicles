import React from 'react';
import { Field, ErrorMessage } from 'formik';

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
TextInputField.propsDefault = {
    type: 'text'
}

export default TextInputField