const getDate = (dateAndTime) => {
    if (dateAndTime !== null) {
        let date = dateAndTime.split('T')[0];

        return date
    }
    return ''
}

const parseToEnum = (value) => {
    if (value !== null) {
        let enumValue = value.replace(/ /g, '_').toUpperCase();
        return enumValue;
    }
    return null;
}

export { getDate, parseToEnum }