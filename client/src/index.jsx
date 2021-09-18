import React from 'react';

import { StylesProvider } from '@material-ui/styles';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './redux/store';

const Root = () => {
  return (
    <StylesProvider injectFirst>
      <Provider store={reduxStore}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </StylesProvider>
  );
};

export default Root;
