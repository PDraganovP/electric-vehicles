import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from '../../service/AuthenticationService';
import PropTypes from 'prop-types';

class AuthenticationRoute extends React.Component {

    isAuthorized() {
        let { admin, moderator } = this.props;
        let isAdmin = AuthenticationService.isAdmin();
        let isModerator = AuthenticationService.isModerator();
        if (admin && isAdmin) {
            return true
        } else if ((moderator && isModerator) || isAdmin) {
            return true
        } else {
            return false
        }
    }

    render() {
        const { anonymous, permitAllUsers } = this.props;
        let isAuthenticated = AuthenticationService.isUserLoggedIn();
        if (anonymous && !isAuthenticated) {
            return <Route {...this.props} />
        } else if (permitAllUsers && isAuthenticated) {
            return <Route {...this.props} />
        } else if (this.isAuthorized() && (!anonymous)) {
            return <Route {...this.props} />
        } else {
            return (
                <Redirect to={{
                    pathname: this.props.redirectTo,
                    state: { from: this.props.location }
                }} />
            )
        }
    }
}

AuthenticationRoute.propTypes = {
    anonymous: PropTypes.bool,
    permitAllUsers: PropTypes.bool,
    admin: PropTypes.bool,
    moderator: PropTypes.bool,
    user: PropTypes.bool
}

AuthenticationRoute.defaultProps = {
    anonymous: false,
    permitAll: false,
    admin: false,
    moderator: false,
    user: false,
    redirectTo: '/login'
}

export default AuthenticationRoute

