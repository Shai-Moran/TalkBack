import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/layouts/Login/Login';
import SignUp from './components/layouts/Sign-up/Sign-up';
import Main from './components/layouts/Main/Main';

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
