import React, { Component } from 'react';
import io from 'socket.io-client';
const socket = io('localhost:3000');
import Room from './Room';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      room: 'roomba'
    };

    this.updateCodeinState = this.updateCodeinState.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
  }

  // emit room on component mounting
  componentDidMount() {
    socket.emit('room', { room: this.state.room });
    // this.setState({ socket: socket });
  }

  // Switch rooms when user changes rooms
  //   handleSwitchRoom() {
  //     this.setState(
  //       { room: this.state.room + 1, prevRoom: this.state.room },
  //       () => {
  //         socket.emit('leave room', {
  //           room: this.state.prevRoom
  //         });
  //         socket.emit('room', { room: this.state.room });
  //       }
  //     );
  //   }

  updateCodeinState(text) {
    this.setState({ code: text }, () => console.log(this.state.code));
    socket.emit('coding', {
      room: this.state.room,
      newCode: text
    });
  }

  updateCodeFromSockets(payload) {
    this.setState({ code: payload.newCode });
  }

  render() {
    socket.on('code sent', payload => {
      console.log(`client received code from server: ${payload.newCode}`);
      this.updateCodeFromSockets(payload);
    });
    return (
      <Room
        code={this.state.code}
        room={this.state.room}
        updateCodeinState={this.updateCodeinState}
      />
    );
  }
}

export default App;
