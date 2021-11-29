import React, { useEffect, useState } from 'react';
import axois from 'axios';
import { Button, Input } from 'semantic-ui-react';


import './FriendRequests.css';

const FriendRequests = ({ user }) => {
  const [newFR, setNewFR] = useState('');
  const [showFR, setShowFR] = useState(false);
  const friendRequests = user.friendRequests;
  const [friendRequestsNames, setFriendRequestsNames] = useState([]);

  const sendFR = () => {
    axois
      .post('http://localhost:5000/api/fr', {
        senderId: user._id,
        username: newFR
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === 'Friend request sended!') {
          setNewFR('Request Sended!');
        }
        if (res.data === 'Request already sended') {
          setNewFR('Request already sended!');
        }
        if (res.data === 'User not found!') {
          setNewFR('User not found');
        }
      });
  };

  useEffect(() => {
    if (friendRequests) {
      let frn = [];
      friendRequests.map((id) => {
        axois
          .post('http://localhost:5000/api/users/get-user', { _id: id })
          .then((res) => {
            frn.push(res.data.username);
            setFriendRequestsNames(frn);
          });
      });
    }
  }, []);

  const exceptReq = (name) => {
    axois.put('http://localhost:5000/api/fr/update', {
      id: user._id,
      senderUN: name
    });
    document.getElementById(`fr-${name}`).remove();
  };

  return (
    <div>
      <div className="friend-req">
        <h1>Friend requests</h1>
        <Button onClick={() => setShowFR(!showFR)}>Show Friend requests</Button>
        {showFR ? (
          <div>
            {console.log(friendRequestsNames.length)}
            {friendRequestsNames.map((name) => {
              return (
                <div className="fr" id={'fr-' + name}>
                  <h5>{name}</h5>
                  <Button className="fr-btn" onClick={() => exceptReq(name)}>
                    Except
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <h4>Send Friend Request:</h4>
        <Input
          type="text"
          onChange={(e) => {
            setNewFR(e.target.value);
          }}
          value={newFR}
        />
        <Button onClick={sendFR}>Send</Button>
      </div>
    </div>
  );
};

export default FriendRequests;
