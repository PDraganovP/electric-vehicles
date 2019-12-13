import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, handelClick }) => {
    return (
        <div className="row">
            <div className="col text-center">
                <button className="btn btn-primary" onClick={handelClick}>{name}</button>
            </div>
        </div>
    )
}

Button.propTypes = {
    name: PropTypes.string,
    handelClick: PropTypes.func,
}

export default Button