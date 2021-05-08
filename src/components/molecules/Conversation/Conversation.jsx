import React, { Component } from 'react';
import './Conversation.scss';
import Message from './../../atoms/Message/Message';
import axios from 'axios';

export class Conversation extends Component {
  constructor(props) {
    super(props);
    this.conversationRef = React.createRef();
  }

  state = {
    conversationOffset: 0,
    listingId: this.props.listingId,
    creatorUsername: this.props.creatorUsername,
    stakeholderUsername: this.props.stakeholderUsername,
    conversation: null,
    messages: [
      { sender: '6095cf137a04540004a4cc54', message: 'Hey, are you still interested?', timestamp: Date.now() },
      { sender: '60957a1e541732f194844cd7', message: 'Yup! can you meed on Tuesday at 8pm?', timestamp: Date.now() },
    ],
  };

  componentDidMount() {
    const { listingId, creatorUsername, stakeholderUsername } = this.state;
    const myUsername = sessionStorage.getItem('username');
    const otherPerson = creatorUsername === myUsername ? stakeholderUsername : myUsername;
    const URL = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_CONVERSATION_EP}/single?listingId=${listingId}&creatorUsername=${creatorUsername}&followerUsername=${otherPerson}`;
    axios.get(URL).then((res) => {
      if (res.data.message === 'no conversation created') {
        axios
          .post(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_CONVERSATION_EP}`, {
            listingId,
            creatorUsername,
            followerUsername: otherPerson,
          })
          .then((res) => {
            this.setState({ conversation: res.data.message });
          });
      } else {
        this.setState({ conversation: res.data.data[0] });
      }
    });
    this.adjustConversationPosition();
  }

  adjustConversationPosition = () => {
    const conversationHeight = this.conversationRef.current.clientHeight;
    const containerHeight = this.conversationRef.current.parentElement.clientHeight;
    if (conversationHeight > containerHeight) {
      this.setState({ conversationOffset: conversationHeight - containerHeight });
    }
  };

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
