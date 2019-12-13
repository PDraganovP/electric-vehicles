import React from 'react';

const ContainerWrapper = ({ children }) => {
    return (
        <div className="container">
            <div className="row">
                {children}
            </div>
        </div>
    )
}

export default ContainerWrapper