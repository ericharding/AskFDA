import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Profile from './views/Profile';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { useAuth0 } from './react-auth0-spa';
import history from './utils/history';
import { createApolloClient } from './configureApollo';
import { ApolloProvider } from 'react-apollo';
import './App.css';

import initFontAwesome from './utils/initFontAwesome';
initFontAwesome();

function App() {
  const { loading, idToken } = useAuth0();
  if (loading) {
    return <Loading />;
  }
  const client = createApolloClient(idToken);
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <NavBar />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
