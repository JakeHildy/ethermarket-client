import React, { Component } from 'react';
import './Conversation.scss';
import Message from './../../atoms/Message/Message';

export class Conversation extends Component {
  constructor(props) {
    super(props);
    this.conversationRef = React.createRef();
  }

  state = {
    conversationOffset: 0,
    messages: [
      { sender: '6095cf137a04540004a4cc54', message: 'Hey, are you still interested?', timestamp: Date.now() },
      { sender: '60957a1e541732f194844cd7', message: 'Yup! can you meed on Tuesday at 8pm?', timestamp: Date.now() },
    ],
  };

  componentDidMount() {
    const conversationHeight = this.conversationRef.current.clientHeight;
    const containerHeight = this.conversationRef.current.parentElement.clientHeight;
    if (conversationHeight > containerHeight) {
      this.setState({ conversationOffset: conversationHeight - containerHeight });
    }
  }

  // componentDidUpdate = () => {};

  // addMessage = () => {};

  render() {
    const { conversationOffset, messages } = this.state;
    const userId = sessionStorage.getItem('userId');
    return (
      <>
        <div
          className="conversation"
          ref={this.conversationRef}
          style={{ transform: `translateY(-${conversationOffset}px)` }}
        >
          {messages.map((message, i) => {
            return <Message key={i} text={message.message} mine={message.sender === userId} />;
          })}
        </div>
      </>
    );
  }
}

export default Conversation;
