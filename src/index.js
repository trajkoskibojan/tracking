import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as MainProvider } from './context/MainContext';

ReactDOM.render(
  <MainProvider>
    <App />
  </MainProvider>,
  document.getElementById('root')
);

reportWebVitals();
