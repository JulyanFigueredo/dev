import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" component={Deliveries} isPrivate />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
