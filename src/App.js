import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard'; 
import './App.css'; // Stellen Sie sicher, dass das CSS importiert wird

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  const handleRegister = (isRegistered) => {
    if (isRegistered) {
      alert('Registrierung erfolgreich! Sie können sich jetzt anmelden.');
      setIsRegistering(false);
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="container">
      {!isAuthenticated ? (
        <div className="main-content">
          {isRegistering ? (
            <Register onRegister={handleRegister} onToggle={toggleForm} />
          ) : (
            <Login onLogin={handleLogin} onToggle={toggleForm} />
          )}
        </div>
      ) : (
        <div className="main-content">
          <Dashboard />
        </div>
      )}
    </div>
  );
}

export default App;
