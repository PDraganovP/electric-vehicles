import React from 'react';
import UserProvider from './components/user-provider/UserProvider';
import ApplicationRoutes from './components/authentication-route/ApplicationRoutes';
import './styles/common-styles.css';

function App() {
  return (
    <React.Fragment>
      <UserProvider>
        <ApplicationRoutes />
      </UserProvider>
    </React.Fragment>
  )
}

export default App;
