import React from 'react';
import { Field } from 'formik';

const DatePickerInputField = ({ name, label }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field type="date" name={name} className="form-control" id={name} aria-describedby={name} />
        </div>
    )
}

export default DatePickerInputField