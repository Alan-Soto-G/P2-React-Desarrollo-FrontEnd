import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-567xdpwr4v4ixqpn.us.auth0.com"
    clientId="cWatbFYrUscs5c3jM5jlLdZRogkQY326"
    authorizationParams={{
      redirect_uri: window.location.origin + '/home'
    }}
  >
    <App />
  </Auth0Provider>
);
