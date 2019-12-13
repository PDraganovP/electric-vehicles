const findRole = (user) => {
    let authorities = user.authorities;
    let containsAdmin = authorities.includes('ROLE_ADMIN');
    let containsModerator = authorities.includes('ROLE_MODERATOR');
    if (containsModerator && containsAdmin) {
        return 'admin';
    } else if (containsModerator && (!containsAdmin)) {
        return 'moderator';
    }
    return 'user';
}

const getUsersTableHeadCells = () => {
    let cells = ['#', 'Username ', 'Email ', 'User role', 'Change user role', 'Delete'];
    return cells
}

export { findRole, getUsersTableHeadCells }