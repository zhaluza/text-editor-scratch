import React from 'react';

const TextBox = props => {
  return (
    <textarea
      value={props.code}
      onChange={e => props.updateCodeinState(e.target.value)}
    />
  );
};

export default TextBox;
