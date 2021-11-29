import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';
import queryString from 'query-string';
import Contacts from '../contacts/Contacts';

import './main.css';
import { Button } from 'semantic-ui-react';

const socket = io.connect('http://localhost:5000');

const Main = () => {
  const [user, setUser] = useState({});
  const [showContacts, setShowContacts] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [room, setRoom] = useState('');

  const location = useLocation();
  const userId = queryString.parse(location.search).id;

  useEffect(() => {
    axios
      .post('http://localhost:5000/api/users/get-user', { _id: userId })
      .then((res) => {
        setUser(res.data);
      });
    socket.emit('new_user', userId);
    socket.on('online_users', (data) => {
      setOnlineUsers(data);
    });
  }, []);

  return (
    <div id="main-page">
      <div className="main">
        <h1>Welcome {user.username}</h1>
        <div className="main-content">
          <Button
            primary
            size="large"
            icon="users"
            className="show-cotacts"
            content="Show Contacts"
            onClick={() => setShowContacts(!showContacts)}
          ></Button>
          <div class="container">
            {showContacts ? (
              <div>
                <Contacts
                  socket={socket}
                  user={user}
                  onlineUsers={onlineUsers}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
