import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import NavigationBar from '../navigation/NavigationBar';
import Index from '../common-components/Index';
import HomePage from '../common-components/HomePage';
import Register from '../register/Register';
import Login from '../login/Login';
import Logout from '../common-components/Logout';
import NotFound from '../common-components/NotFound';
import Unauthorized from '../common-components/Unauthorized';
import ShowElectricCars from '../show-electric-vehicles/ShowElectricCars';
import ShowElectricTrucks from '../show-electric-vehicles/ShowElectricTrucks';
import ElectricCar from '../electric-cars/ElectricCar';
import ElectricTruck from '../electric-trucks/ElectricTruck';
import UserProfile from '../users/UserProfile';
import EditUserProfile from '../users/EditUser';
import AllUsers from '../users/AllUsers';
import CompareElectricCars from '../compare-vehicles/CompareElectricCars';
import CompareElectricTrucks from '../compare-vehicles/CompareElectricTrucks';
import AuthenticationRoute from './AuthenticationRoute';
import '../../styles/common-styles.css';

const ApplicationRoutes = () => {

    return (
        <React.Fragment>
            <Router>
                <NavigationBar />
                <div className='bg'>
                    <Switch>
                        <AuthenticationRoute path='/' component={Index} exact anonymous={true} redirectTo="/unauthorized" />
                        <AuthenticationRoute path='/home' component={HomePage} exact permitAllUsers={true} />
                        <AuthenticationRoute path='/register' component={Register} exact redirectTo="/unauthorized" anonymous={true} />
                        <AuthenticationRoute path='/login' component={Login} exact redirectTo="/unauthorized" anonymous={true} />
                        <AuthenticationRoute path='/logout' component={Logout} exact anonymous={true} />
                        <AuthenticationRoute path='/unauthorized' component={Unauthorized} exact permitAllUsers={true} />
                        <AuthenticationRoute path='/show-cars' component={ShowElectricCars} exact permitAllUsers={true} />
                        <AuthenticationRoute path='/show-trucks' component={ShowElectricTrucks} exact permitAllUsers={true} />
                        <AuthenticationRoute path='/add-car' component={ElectricCar} exact admin={true} moderator={true} />
                        <AuthenticationRoute path='/add-truck' component={ElectricTruck} exact admin={true} moderator={true} />
                        <AuthenticationRoute path='/edit-car/:id' component={ElectricCar} exact admin={true} moderator={true} />
                        <AuthenticationRoute path='/edit-truck/:id' component={ElectricTruck} exact admin={true} moderator={true} />
                        <AuthenticationRoute path="/all-users" component={AllUsers} exact admin={true} />
                        <AuthenticationRoute path="/profile" component={UserProfile} exact permitAllUsers={true} />
                        <AuthenticationRoute path="/edit-profile" component={EditUserProfile} exact permitAllUsers={true} />
                        <AuthenticationRoute path='/compare-cars' component={CompareElectricCars} exact permitAllUsers={true} />
                        <AuthenticationRoute path='/compare-trucks' component={CompareElectricTrucks} exact permitAllUsers={true} />
                        <AuthenticationRoute component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </React.Fragment>
    )
}

export default ApplicationRoutes 