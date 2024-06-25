import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: 'DEINE_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/DEINE_TENANT_ID',
    redirectUri: 'http://localhost:3000/'
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
