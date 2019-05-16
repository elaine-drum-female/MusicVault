import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Wrapper from './hoc/wrapper';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/register_login" component={RegisterLogin} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Wrapper>
  );
};

export default App;