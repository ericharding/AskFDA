import React from 'react';
import './App.css';

import { getIntrospectionQuery } from 'graphql'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {getIntrospectionQuery()}
      </header>
    </div>
  );
}

export default App;
