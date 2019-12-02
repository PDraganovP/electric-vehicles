import React from 'react';

const Button = ({ name, handelClick }) => {
    return (
        <div className="row">
            <div className="col text-center">
                <button className="btn btn-primary" onClick={handelClick}>{name}</button>
            </div>
        </div>
    )
}

export default Button