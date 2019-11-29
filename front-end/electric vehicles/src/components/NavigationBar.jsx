import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AuthenticationService from '../service/AuthenticationService';

class NavigationBar extends React.Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const isAdmin = AuthenticationService.isAdmin();
        const isModerator = AuthenticationService.isModerator();

        return (
            <React.Fragment>
                <Navbar bg="light" variant="light" style={{ color: 'white', textTransform: 'uppercase' }}>
                    {isUserLoggedIn && <Link to="/home" className="navbar-brand">EV</Link>}
                    <Nav>
                        {(!isUserLoggedIn) && <Link to="/" className="nav-link"> Home</Link>}
                        {(isUserLoggedIn) && <Link to="/home" className="nav-link">Home</Link>}
                        {isUserLoggedIn && <NavDropdown title="cars" id="basic-nav-dropdown">
                            <Link to="/show-cars" className="nav-link">Show cars</Link>
                            {(isAdmin || isModerator) && <Link to="/add-car" className="nav-link">Add Car</Link>}
                        </NavDropdown>}
                        {isUserLoggedIn && <NavDropdown title="trucks" id="basic-nav-dropdown">
                            <Link to="/show-trucks" className="nav-link">Show trucks</Link>
                        </NavDropdown>}
                    </Nav>
                    <Nav className="ml-auto" >
                        {(isUserLoggedIn) && <Link to="/logout" className="nav-link justify-content-end" onClick={AuthenticationService.logout}>Log out</Link>}
                        {(!isUserLoggedIn) && <Link to="/register" className="nav-link">Register</Link>}
                        {(!isUserLoggedIn) && <Link to="/login" className="nav-link">Login</Link>}
                    </Nav>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default withRouter(NavigationBar)