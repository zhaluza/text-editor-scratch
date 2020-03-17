import React, { Component } from 'react';
import TextBox from './TextBox';
const io = require('socket.io-client');
const socket = io('localhost:3000', {
  secure: true,
  rejectUnauthorized: false
});

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: 'roomba',
      prevRoom: null
    };
    // this.handleSwitchRoom = this.handleSwitchRoom.bind(this);
  }
  // emit room on component mounting
  componentDidMount() {
    socket.emit('room', { room: this.state.room });
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

  render() {
    return (
      <div className="container">
        <h1>Collaborative Code Editor</h1>
        <h2>Room: {this.state.room}</h2>
        {/* <div className="change-room-buttons">
          <button onClick={() => this.handleSwitchRoom()}>+</button>
        </div> */}
        <TextBox room={this.state.room} />
      </div>
    );
  }
}

export default Room;
