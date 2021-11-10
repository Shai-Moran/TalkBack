import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/layouts/login/login';
import SignUp from './components/layouts/sign-up/sign-up';
import Main from './components/layouts/main/main';

function App() {
  return (
    <div>
      <h1>Home page</h1>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/main" component={Main} />
      </Router>
    </div>
  );
}

export default App;
