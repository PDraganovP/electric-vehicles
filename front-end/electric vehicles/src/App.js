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
              <Route path='/cars' exact component={ShowElectricCars} exact />
              <Route path='/trucks' exact component={ShowElectricTrucks} exact />
              <Route component={NotFound} />
         </Switch>
       </Router>
   </React.Fragment>
  )
}

export default App;
