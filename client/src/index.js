import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reduxStore from './redux/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StylesProvider injectFirst>
    <Provider store={reduxStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </StylesProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
