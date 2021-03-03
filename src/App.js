import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Error404 from './containers/Error404';
import Main from './containers/Main';
import Project from './containers/Project';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/project/:id' component={Project} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
