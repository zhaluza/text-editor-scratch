import React, { Component } from 'react';
const io = require('socket.io-client');
const socket = io('localhost:3000');
// socket.emit('coding', { newCode: 'hello' });

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
    socket.on('receive code', payload => {
      console.log('received code');
      this.updateCodeFromSockets(payload);
    });
    this.updateCodeinState = this.updateCodeinState.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
  }

  updateCodeFromSockets(payload) {
    this.setState({ code: payload.newCode });
  }

  updateCodeinState(text) {
    socket.emit('coding', {
      newCode: text
    });
    this.setState({ code: text }, () => console.log(this.state.code));
  }
  render() {
    return (
      <textarea
        value={this.state.code}
        onChange={e => this.updateCodeinState(e.target.value)}
      />
    );
  }
}

export default TextBox;
