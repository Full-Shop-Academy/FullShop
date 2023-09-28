import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client'; 
import App from './App.jsx';

// Global styles
import './App.css';
import './assets/styles/main.css';

// Components styles
import './components/Cart/Cart.css';
import './components/Filters/Filters.css';
import './components/Header/Header.css';
import './components/ProductDetail/ProductDetail.css';
import './components/ProductList/ProductList.css';
import './components/Sidebar/Sidebar.css';

const root = document.getElementById('root');
const appRoot = createRoot(root);

appRoot.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
