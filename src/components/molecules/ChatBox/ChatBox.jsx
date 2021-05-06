import React, { Component } from 'react';
import './ChatBox.scss';

export class ChatBox extends Component {
  render() {
    const { stakeholders } = this.props;
    return <div className="chat-box"></div>;
  }
}

export default ChatBox;
