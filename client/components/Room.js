import React from 'react';
import TextBox from './TextBox';

const Room = props => {
  return (
    <div className="container">
      <h1>Collaborative Code Editor</h1>
      <h2>Room: {props.room}</h2>
      {/* <div className="change-room-buttons">
          <button onClick={() => handleSwitchRoom()}>+</button>
        </div> */}
      <TextBox code={props.code} updateCodeinState={props.updateCodeinState} />
    </div>
  );
};

export default Room;
