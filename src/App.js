import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage.component';

function App() {
  return (
    <Switch>
      <Route path='/' component={Homepage} />
    </Switch>
  );
}

export default App;
