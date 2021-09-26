/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home/Home';
import Faqs from './pages/Faq';
import AppRoomForOrganization from './pages/Room';

function App() {
  return (
    <Router basename="/goals">
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/room/:orgId" component={AppRoomForOrganization} />
          <Route path="/faqs" component={Faqs} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default withRouter(App);
