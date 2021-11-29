import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/layouts/login/login';
import SignUp from './components/layouts/sign-up/Sign-up';
import Main from './components/layouts/main/main';
import Home from './components/home/Home';

import './App.css';

function App() {
  return (
    <div id="app">
      <Router>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/main" component={Main} />
      </Router>
    </div>
  );
}

export default App;
