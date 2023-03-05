import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";


import App from './App';

const local_host = "http://localhost:5000";

const remote_host = "https://customer-credit-app-api-production-d09b.up.railway.app"

axios.defaults.baseURL = remote_host;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

