import React, { Component, useState } from 'react';
import Chat from '../chat/chats';
import Contacts from '../contacts/contects';

import './main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        contacts: []
      }
    };

    // this.onChangeUsername = this.onChangeUsername.bind(this);
    // this.onChangePassword = this.onChangePassword.bind(this);
  }
  render() {
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
  }
}

export default Main;
