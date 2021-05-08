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
    return (
      <>
        <div
          className="conversation"
          ref={this.conversationRef}
          style={{ transform: `translateY(-${conversationOffset}px)` }}
        >
          {messages.map((message, i) => {
            return <Message key={i} text="Perfect! :)" mine={true} />;
          })}
        </div>
      </>
    );
  }
}

export default Conversation;
