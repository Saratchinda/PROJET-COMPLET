import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import './index.css'; 
import App from './App'; 
import reportWebVitals from './reportWebVitals'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application
root.render(
  // Fournit le store Redux à toute l'application via le composant Provider
  <Provider store={store}>
    {/* Composant principal qui contient les routes et les composants */}
    <App />
  </Provider>
);

reportWebVitals();
