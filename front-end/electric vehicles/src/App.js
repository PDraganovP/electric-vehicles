import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './components/common-components/Index'
import HomePage from './components/common-components/HomePage'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Logout from './components/common-components/Logout'
import NotFound from './components/common-components/NotFound'
import Unauthorized from './components/common-components/Unauthorized'

function App() {
  return (
   <React.Fragment>
       <Router>
         <Switch>
             <Route path='/' component={Index} />
             <Route path='/home' component={HomePage} />
             <Route path='/register' component={Register} />
             <Route path='/login' component={Login} />
             <Route path='/logout' component={Logout} />
             <Route path='/unauthorized' component={Unauthorized} />
             <Route component={NotFound} />
         </Switch>
       </Router>
   </React.Fragment>
  )
}

export default App;
