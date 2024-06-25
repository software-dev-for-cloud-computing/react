import React from 'react';
import ReactDOM from 'react-dom';
import { MsalProvider } from '@azure/msal-react';
import App from './App';
import msalInstance from './authconfig';  

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
