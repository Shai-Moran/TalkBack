import React, { useState } from 'react';
import { useLocation } from 'react-router';
import io from 'socket.io-client';
import queryString from 'query-string';
import Chat from '../Chats/Chats';
import Contacts from '../Contacts/Contacts';

import './Main.css';

const Main = () => {
  const socket = io.connect('http://localhost:5000');

  const location = useLocation();
  const userId = queryString.parse(location.search).id;
  console.log(userId);

  return (
    <div class="container">
      <div>
        <Contacts />
      </div>
      <div>
        <Chat />
      </div>
    </div>
  );
};

export default Main;
