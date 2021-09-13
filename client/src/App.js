/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Faqs from 'pages/faqs';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/faqs" component={Faqs} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
