import React, { Component } from 'react';
import './Conversation.scss';
import Message from './../../atoms/Message/Message';
import Loading from './../Loading/Loading';
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
    conversationLoaded: false,
  };

  componentDidMount() {
    const { setConversationId } = this.props;
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
            this.setState({ conversation: res.data.message, conversationLoaded: true }, () => {
              setConversationId(this.state.conversation._id);
            });
          });
      } else {
        this.setState({ conversation: res.data.data[0], conversationLoaded: true }, () => {
          setConversationId(this.state.conversation._id);
        });
      }
    });
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
    if (!this.state.conversationLoaded) return <Loading />;
    const { conversationOffset, conversation } = this.state;
    const userId = sessionStorage.getItem('userId');
    return (
      <>
        <div
          className="conversation"
          ref={this.conversationRef}
          style={{ transform: `translateY(-${conversationOffset}px)` }}
        >
          {conversation.conversationHistory.map((message, i) => {
            return <Message key={i} text={message.message} mine={message.senderId === userId} />;
          })}
        </div>
      </>
    );
  }
}

export default Conversation;
