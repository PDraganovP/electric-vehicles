import React from 'react';

const TableHead = (props) => {
    let headCells = props.cells.map((cell, index) =>
        <th key={index + cell}>{cell}</th>)
    return (
        <thead >
            <tr className='data-row'>
                {headCells}
            </tr>
        </thead>
    )
}

export default TableHead

