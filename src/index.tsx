import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Auth0Provider } from './react-auth0-spa';
import config from './auth0config';
import history from './utils/history';

const onRedirectCallbck = (appState: any) => {
  console.log('onRedirectCallbck');
  history.push(appState?.targetUrl || window.location.pathname);
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallbck}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
