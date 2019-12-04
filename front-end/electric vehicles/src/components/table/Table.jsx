import React from 'react';

const Table = ({ tableHeading, children }) => {
    return (
        <React.Fragment>
            <h1 style={{ color: 'red' }} className='text-center my-3'>{tableHeading}</h1>
            <table className="table text-center">
                {children}
            </table>
        </React.Fragment>
    )
}

export default Table