import React from 'react';
import './App.css';

import { Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import history from './utils/history';

import { useAuth0 } from './react-auth0-spa';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Profile from './views/Profile';

function App() {
  const { loading } = useAuth0();
  if (loading) {
    return <Loading />;
  }
  return (
    <Router history={history}>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
