import React from 'react';
import ReactDOM from 'react-dom';
// Disable service work for now until the client side routing works in production.
// import registerServiceWorker from './registerServiceWorker';
import unregister from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
// Disable service work for now until the client side routing works in production.
// registerServiceWorker();
unregister()
