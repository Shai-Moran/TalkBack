import React, { useState } from 'react';
import { Button, Input, Header, Form } from 'semantic-ui-react'
import axios from 'axios';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const user = {
      username: username,
      password: password
    };

    axios.post('http://localhost:5000/login', user).then((res) => {
      console.log(res.data);
      if (res.data !== false) {
        window.location = `/main?id=${res.data._id}`;
      }
      if (!res.data) {
        document.getElementById('error').style.visibility = 'visible';
      }
    });
  };

  return (
    <div id='login'>
      <h1>Login</h1>
      <Form>
        <Form.Field>
          <label for="usernameTB">UserName:</label>
          <Input
            type="text"
            required
            placeholder="Enter Username..."
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label for="passwordTB">Password:</label>
          <Input
            type="password"
            required
            placeholder="Enter Password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Field>

        <Button type="submit" onClick={onSubmit}>
          Sign-in
        </Button>
      </Form>
      <div>
        <Header as="h1" id="error">Username or password are incorrect</Header>


      </div>
    </div>
  );
};

export default Login;
