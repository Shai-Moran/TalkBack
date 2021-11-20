import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';
import queryString from 'query-string';
import Chat from '../chats/Chats';
import Contacts from '../contacts/Contacts';

import './Main.css';

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
    <div>
      <h1>Welcome {user.username}</h1>
      <button onClick={() => setShowContacts(!showContacts)}>
        Show Contacts:
      </button>
      <div class="container">
        {showContacts ? (
          <div>
            <Contacts socket={socket} user={user} onlineUsers={onlineUsers} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Main;
