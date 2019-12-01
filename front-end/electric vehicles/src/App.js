import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './components/common-components/Index'
import HomePage from './components/common-components/HomePage'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Logout from './components/common-components/Logout'
import NotFound from './components/common-components/NotFound'
import Unauthorized from './components/common-components/Unauthorized'
import ShowElectricCars from './components/show-electric-vehicles/ShowElectricCars'
import ShowElectricTrucks from './components/show-electric-vehicles/ShowElectricTrucks'
import ElectricCar from './components/electric-cars/ElectricCar'
import ElectricTruck from './components/electric-trucks/ElectricTruck'
import UserProfile from './components/users/UserProfile'
import EditUserProfile from './components/users/EditUser'
import AllUsers from './components/users/AllUsers'

function App() {
  return (
   <React.Fragment>
       <Router>
         <Switch>
             <Route path='/' component={Index} exact />
             <Route path='/home' component={HomePage} exact />
             <Route path='/register' component={Register} exact />
             <Route path='/login' component={Login} exact />
             <Route path='/logout' component={Logout} exact />
             <Route path='/unauthorized' component={Unauthorized} exact />
             <Route path='/show-cars' component={ShowElectricCars} exact />
             <Route path='/show-trucks' component={ShowElectricTrucks} exact />
             <Route path='/add-car' component={ElectricCar} exact />
             <Route path='/add-truck' component={ElectricTruck} exact />
             <Route path='/edit-car/:id' component={ElectricCar} exact />
             <Route path='/edit-truck/:id' component={ElectricTruck} exact />
             <Route path="/all-users" component={AllUsers} exact />
             <Route path="/profile" component={UserProfile} exact />
             <Route path="/edit-profile" component={EditUserProfile} exact />
             <Route component={NotFound} />
         </Switch>
       </Router>
   </React.Fragment>
  )
}

export default App;
