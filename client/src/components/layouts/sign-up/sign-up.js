import React, { useState } from 'react';
import { Button, Input, Form } from 'semantic-ui-react';
import axios from 'axios';
import './Sign-up.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const incorrectPassword = () => {
    setConfirmPassword('');
  };

  const onSubmit = () => {
    const newUser = {
      username: username,
      password: password,
      contacts: [],
      friendRequests: []
    };

    if (password !== confirmPassword) {
      incorrectPassword();
    } else {
      axios.post('http://localhost:5000/sign-up', newUser).then((res) => {
        if (res.data) {
          window.location = '/login';
        } else {
          setUsername('');
          document.getElementById('error').style.visibility = 'visible';
        }
      });
    }
  };

  return (
    <div id="sign-up">
      <h1>Sign-up</h1>
      <Form>
        <h4 id="error">Username is already in use</h4>
        <Form.Field>
          <div>
            <label for="usernameTB">UserName:</label>
            <Input
              type="text"
              required
              placeholder="Enter new username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <div>
            <label for="passwordTB">Password:</label>
            <Input
              type="password"
              required
              placeholder="Enter new Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <div>
            <label for="confirmPasswordTB">Confirm Password:</label>
            <Input
              id="cpInput"
              type="password"
              required
              placeholder="confirm password..."
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </Form.Field>
        <div>
          <Button onClick={onSubmit}>Sign Up!</Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
