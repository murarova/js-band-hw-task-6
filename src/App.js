import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound';

const App = () => (
    <>
        <Switch>
            <Redirect exact path="/" to="/todos" />
            <Route path="/todos" component={Dashboard} />
            <Route component={PageNotFound} />
        </Switch>
    </>
);

export default App;
