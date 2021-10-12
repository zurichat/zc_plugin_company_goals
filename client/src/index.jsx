import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import { StylesProvider } from '@material-ui/styles';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './redux/store';
import './index.css';

const Root = () => {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Provider store={reduxStore}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </StylesProvider>
    </>
  );
};

export default Root;
