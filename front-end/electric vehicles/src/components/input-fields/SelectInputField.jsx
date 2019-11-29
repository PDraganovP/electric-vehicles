import React from 'react';
import { Field, ErrorMessage } from 'formik';

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
export default SelectInputField