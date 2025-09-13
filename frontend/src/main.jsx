import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from "./store/store.js"
import { Provider } from 'react-redux'

// Preload critical route
const preloadHome = () => import('./pages/Home');
const preloadLogin = () => import('./pages/Login');

// Start preloading critical routes immediately
preloadHome();
preloadLogin();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
