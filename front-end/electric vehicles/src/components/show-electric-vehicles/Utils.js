const getDate = (dateAndTime) => {
    if (dateAndTime !== null) {
        let date = dateAndTime.split('T')[0];
        let ymd = date.split('-');
        let dmy = ymd[2] + '-' + ymd[1] + '-' + ymd[0];
        return dmy
    }
    return 'No info'
}

export { getDate }