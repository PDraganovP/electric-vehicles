import React from 'react';

const TableHead = (props) => {
    let headCells = props.cells.map((cell, index) =>
        <th style={{ verticalAlign: 'middle' }} key={index + cell}>{cell}</th>)
    return (
        <thead >
            <tr >
                {headCells}
            </tr>
        </thead>
    )
}

export default TableHead

/* const cells = ['#', 'Manufacturer ', 'Model ', 'Electric vehicle type', 'Top speed',
'Nominal range', 'Market release', 'Payload capacity', 'Number of axel', 'Edit ']; */

