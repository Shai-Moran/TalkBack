import React, { useEffect, useState } from 'react';
import axois from 'axios';

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
        <button onClick={() => setShowFR(!showFR)}>Show Friend requests</button>
        {showFR ? (
          <div>
            {console.log(friendRequestsNames.length)}
            {friendRequestsNames.map((name) => {
              return (
                <div className="fr" id={'fr-' + name}>
                  <h5>{name}</h5>
                  <button className="fr-btn" onClick={() => exceptReq(name)}>
                    Except
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <h4>Send Friend Request:</h4>
        <input
          type="text"
          onChange={(e) => {
            setNewFR(e.target.value);
          }}
          value={newFR}
        />
        <button onClick={sendFR}>Send</button>
      </div>
    </div>
  );
};

export default FriendRequests;
