import React from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import Login from './login';
import Dashboard from './Dashboard';  

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
 

 
/* import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Login from './login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Mock Login</button>
      ) : (
        <>
          <Dashboard />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;  */