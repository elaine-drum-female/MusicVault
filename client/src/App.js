import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Wrapper from './hoc/wrapper';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import UserDashboard from './components/PrivateDashboard';
import Authorize from './hoc/auth';

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/user/dashboard" component={Authorize(UserDashboard, true)} />
        <Route exact path="/register" component={Authorize(Register, false)} />
        <Route exact path="/register_login" component={Authorize(RegisterLogin, false)} />
        <Route exact path="/" component={Authorize(Home , null)} />
      </Switch>
    </Wrapper>
  );
};

export default App;