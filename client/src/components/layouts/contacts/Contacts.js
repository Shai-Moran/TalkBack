import React, { useEffect, useState } from 'react';
import FriendRequests from '../friend-requests/FriendRequests';
import Chat from '../chats/Chats';
import axios from 'axios';
import './Contacts.css';

const Contacts = ({ socket, user, onlineUsers }) => {
  const contacts = user.contacts;
  const [contactId, setContactId] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [online, setOnline] = useState([]);
  const [offline, setOffline] = useState([]);

  useEffect(() => {
    let isUserOnlineFlag = false;
    contacts.map((contact) => {
      axios
        .post('http://localhost:5000/api/users/get-user', { _id: contact })
        .then((res) => {
          onlineUsers.map((on) => {
            if (res.data._id === on.userId) {
              setOnline((list) => [...list, res.data]);
              isUserOnlineFlag = true;
            }
          });
          if (!isUserOnlineFlag) {
            setOffline((list) => [...list, res.data]);
            isUserOnlineFlag = false;
          }
        });
    });
  }, []);

  return (
    <div class="contacts">
      <h1>Contacts</h1>
      <h2>Online:</h2>
      {console.log(online)}
      {online.map((contact) => {
        return (
          <p
            onClick={() => {
              setContactId(contact._id);
              setShowChat(!showChat);
            }}
          >
            {contact.username}
          </p>
        );
      })}
      <h2>Offline:</h2>
      {offline.map((contact) => {
        return <p>{contact.username}</p>;
      })}
      <FriendRequests user={user} />
      {showChat ? (
        <Chat className="chat" user={user} contactId={contactId} socket={socket} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Contacts;
