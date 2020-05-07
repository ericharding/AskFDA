import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';

import { getIntrospectionQuery } from 'graphql';
import { useAuth0 } from './react-auth0-spa';

function App() {
  const { loading } = useAuth0();
  return (
    <div className="App">
      <header className="App-header">
        {loading ? 'loading' : getIntrospectionQuery()}
      </header>
    </div>
  );
}

export default App;
