import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AuthenticationService from '../../service/AuthenticationService';

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
                            {(isAdmin || isModerator) && <Link to="/add-truck" className="nav-link">Add Truck</Link>}
                        </NavDropdown>}
                        {isUserLoggedIn && <NavDropdown title="compare" id="basic-nav-dropdown">
                            <Link to="/compare-cars" className="nav-link">Cars</Link>
                            <Link to="/compare-trucks" className="nav-link">Trucks</Link>
                        </NavDropdown>}
                        {(isUserLoggedIn) && <NavDropdown title="User" id="user-dropdown">
                            {(isUserLoggedIn) && <Link to="/profile" className="nav-link">Profile</Link>}
                            {(isUserLoggedIn) && <Link to="/edit-profile" className="nav-link">Edit profile</Link>}
                            {(isUserLoggedIn && isAdmin) && <Link to="/all-users" className="nav-link">All users</Link>}
                        </NavDropdown>}
                    </Nav>
                    <Nav className="ml-auto" >
                        {(isUserLoggedIn) && <Link to="/logout" className="nav-link justify-content-end" onClick={AuthenticationService.logout}>Logout</Link>}
                        {(!isUserLoggedIn) && <Link to="/register" className="nav-link">Register</Link>}
                        {(!isUserLoggedIn) && <Link to="/login" className="nav-link">Login</Link>}
                    </Nav>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default withRouter(NavigationBar)