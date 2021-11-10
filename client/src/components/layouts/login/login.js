import React, { Component } from 'react';
import axios from 'axios';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('http://localhost:5000/login', user).then((res) => {
      if (res.status === 200) {
        window.location = '/main';
      } else {
        console.log('oof');
        document.getElementById('error').style.visibility = 'visible';
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div>
          <h4 id="error">Username or password are incorrect</h4>
        </div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label for="usernameTB">UserName:</label>
            <input
              type="text"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div>
            <label for="passwordTB">Password:</label>
            <input
              type="password"
              required
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div>
            <input type="submit" value="Sign-in" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
