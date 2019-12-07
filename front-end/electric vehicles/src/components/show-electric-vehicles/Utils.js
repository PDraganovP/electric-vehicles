const getDate = (dateAndTime) => {
    if (dateAndTime !== null) {
        let date = dateAndTime.split('T')[0];
        let ymd = date.split('-');
        let dmy = ymd[2] + '-' + ymd[1] + '-' + ymd[0];
        return dmy
    }
    return 'No info'
}

const getCarsTableHeadCells = (isModerator, isAdmin) => {
    let cells = ['#', 'Manufacturer ', 'Model ', 'Electric vehicle type', 'Top speed',
        'Nominal range', 'Autonomous', 'Market release'];
    let actions = ['Edit ', 'Delete'];
    if (isModerator || isAdmin) {
        cells = cells.concat(actions)
    }
    return cells
}

const getTrucksTableHeadCells = (isModerator, isAdmin) => {
    let cells = ['#', 'Manufacturer ', 'Model ', 'Electric vehicle type', 'Top speed',
        'Nominal range', 'Market release', 'Payload capacity', 'Number of axel'];
    let actions = ['Edit ', 'Delete'];
    if (isModerator || isAdmin) {
        cells = cells.concat(actions)
    }
    return cells
}

export { getDate, getCarsTableHeadCells, getTrucksTableHeadCells }