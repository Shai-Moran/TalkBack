import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
    console.log(this.state);
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
    console.log(this.state);
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
    console.log(this.state);
  }

  incorrectPassword() {
    this.setState({
      confirmPassword: ''
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      contacts: []
    };
    console.log(newUser);

    if (this.state.password !== this.state.confirmPassword) {
      this.incorrectPassword();
    } else {
      axios.post('http://localhost:5000/sign-up', newUser).then((res) => {
        if (res.data === 'user added') {
          window.location = '/login';
        } else {
          this.setState({
            username: ''
          });
        }
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Sign-up</h1>
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
            <label for="confirmPasswordTB">Confirm Password:</label>
            <input
              type="password"
              required
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
          </div>
          <div>
            <input type="submit" value="Sign-up" />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
