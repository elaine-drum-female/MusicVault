import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Wrapper from './hoc/wrapper';

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Wrapper>
  );
};

export default App;