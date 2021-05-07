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
    messages: [],
  };

  componentDidMount = () => {
    const conversationHeight = this.conversationRef.current.clientHeight;
    const containerHeight = this.conversationRef.current.parentElement.clientHeight;
    console.log(conversationHeight, containerHeight);
    if (conversationHeight > containerHeight) {
      this.setState({ conversationOffset: conversationHeight - containerHeight });
    }
  };

  // componentDidUpdate = () => {};

  // addMessage = () => {};

  render() {
    const { conversationOffset, messages } = this.state;
    return (
      <div
        className="conversation"
        ref={this.conversationRef}
        style={{ transform: `translateY(-${conversationOffset}px)` }}
      >
        {messages.map((message) => {
          <Message text="Perfect! :)" mine={true} />;
        })}
        <Message text="Hey, are you still interested?" mine={false} />
        <Message text="Yup, can you meet on Tuesday at 8pm?" mine={true} />
        <Message text="See you there!" mine={false} />
        <Message text="Perfect! :)" mine={true} />
        <Message text="Perfect! :)" mine={true} />
        <Message text="Perfect! :)" mine={true} />
        <Message text="Perfect! :)" mine={true} />
        <Message text="Perfect! :)" mine={true} />
        <Message text="Perfect! :)" mine={true} />
        <Message text="Perfect! :)" mine={true} />
      </div>
    );
  }
}

export default Conversation;
