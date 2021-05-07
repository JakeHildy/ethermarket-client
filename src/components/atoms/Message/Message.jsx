import React from 'react';
import './Message.scss';

function Message({ text, mine }) {
  return <p className={`message ${mine ? 'message--mine' : ''}`}>{text}</p>;
}

export default Message;
