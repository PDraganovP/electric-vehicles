import React from 'react';
import { Field, } from 'formik';

const RadioInputField = ({ name, value, label }) => {
    return (
        <React.Fragment>
            <div className="form-check form-check-inline">
                <Field className="form-check-input" type="radio" name={name} id={"inlineRadio" + value} value={value} />
                <label className="form-check-label" htmlFor={"inlineRadio" + value}>{label}</label>
            </div>
        </React.Fragment>
    )
}
export default RadioInputField 