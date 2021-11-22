import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import {init as sentryInit} from "./helpers/sentry";

sentryInit();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

