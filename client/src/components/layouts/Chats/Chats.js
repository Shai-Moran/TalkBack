import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Button, Input, Icon } from 'semantic-ui-react';

import './Chats.css';


const Chat = ({ user, contactId, socket }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        senderId: user._id,
        senderUsername: user.username,
        reciverId: contactId,
        content: currentMessage,
        date:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes()
      };

      await socket.emit('send_message', messageData);
      setMessageList([...messageList, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    const roomData = {
      user1Id: user._id,
      user2Id: contactId
    };
    socket.emit('join_room', roomData);

    socket.emit('chat_history', roomData);

    socket.on('receive_history', (data) => {
      console.log(data);
      data.map((msg) => {
        setMessageList((list) => [...list, msg]);
      });
    });

    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={user._id === messageContent.senderId ? 'you' : 'other'}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.content}</p>
                  </div>
                  <div className="message-meta">
                    <p>{messageContent.date}</p>
                    <p id="author">{messageContent.senderUsername}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <Input
          icon={<Icon name='send' onClick={sendMessage} inverted circular link />}
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        {/* <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button> */}
      </div>
    </div>
  );
};

export default Chat;
