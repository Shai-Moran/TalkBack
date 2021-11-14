import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

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
    <div>
      <h1>Login</h1>
      <div>
        <h4 id="error">Username or password are incorrect</h4>
      </div>
      <div>
        <label for="usernameTB">UserName:</label>
        <input
          type="text"
          required
          placeholder="Enter Username..."
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <label for="passwordTB">Password:</label>
        <input
          type="password"
          required
          placeholder="Enter Password..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          Sign-in
        </button>
      </div>
    </div>
  );
};

export default Login;
