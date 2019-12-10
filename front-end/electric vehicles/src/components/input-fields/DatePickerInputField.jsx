import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const DatePickerInputField = ({ name, label }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field type="date" name={name} className="form-control" id={name} aria-describedby={name} />
        </div>
    )
}

DatePickerInputField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
}

export default DatePickerInputField