import React, { Component } from 'react';
const io = require('socket.io-client');
const socket = io('localhost:3000');

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
    // socket.on('receive code', payload => {
    //   console.log('received code');
    //   this.updateCodeFromSockets(payload);
    // });
    this.updateCodeinState = this.updateCodeinState.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
  }

  updateCodeFromSockets(payload) {
    this.setState({ code: payload.newCode });
  }

  updateCodeinState(text) {
    this.setState({ code: text }, () => console.log(this.state.code));
    socket.emit('coding', {
      room: this.props.room,
      newCode: text
    });
  }
  render() {
    socket.on('code sent', payload => {
      console.log(`client received code from server: ${payload.newCode}`);
      this.updateCodeFromSockets(payload);
    });
    return (
      <textarea
        value={this.state.code}
        onChange={e => this.updateCodeinState(e.target.value)}
      />
    );
  }
}

export default TextBox;
