import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

const SelectInputField = ({ name, label, options }) => {

    return (
        <div className="form-group">
            <label htmlFor={'select' + name}>{label}</label>
            <Field component="select" name={name} className="form-control" id={'select' + name}>
                <option>--Select--</option>
                {options}
            </Field>
            <ErrorMessage name={name} component="div"
                style={{ color: 'red' }} />
        </div>
    )
}

SelectInputField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array
}

export default SelectInputField