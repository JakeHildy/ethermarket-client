import React, { Component } from 'react';
import './ChatBox.scss';
import Conversation from './../../molecules/Conversation/Conversation';
import InputField from './../../atoms/InputField/InputField';
import IconSend from './../../atoms/IconSend/IconSend';
import axios from 'axios';

export class ChatBox extends Component {
  state = {
    activeId: 0,
    message: '',
    stakeholders: this.props.stakeholders,
    listingId: this.props.listingId,
    creatorUsername: this.props.creatorUsername,
    conversationId: null,
  };

  chatTabClicked = (e) => {
    e.preventDefault();
    let id;
    if (!e.target.dataset.id) {
      id = e.target.parentElement.dataset.id;
    } else {
      id = e.target.dataset.id;
    }
    this.setState({ activeId: Number(id) });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  setConversationId = (id) => {
    this.setState({ conversationId: id });
  };

  handleMessageSend = (e) => {
    // e.preventDefault();
    if (this.state.message === '') return;
    console.log(this.state.message);
    // Send message to backend:
    axios.post(
      `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_CONVERSATION_EP}/post/${this.state.conversationId}`,
      {
        senderId: sessionStorage.getItem('userId'),
        message: this.state.message,
      }
    );
    this.setState({ message: '' });
  };

  render() {
    const { activeId, stakeholders, listingId, creatorUsername } = this.state;
    return (
      <div className="chat-box">
        <div className="chat-box__tabs">
          {stakeholders.map((stakeholder, i) => {
            return (
              <div
                onClick={this.chatTabClicked}
                data-id={i}
                key={i}
                className={`chat-box__tab ${i === activeId ? 'chat-box__tab--active' : ''}`}
              >
                <h4>{stakeholder.username}</h4>
              </div>
            );
          })}
        </div>
        <div className="chat-box__conversation">
          <Conversation
            listingId={listingId}
            creatorUsername={creatorUsername}
            stakeholderUsername={stakeholders[activeId].username}
            setConversationId={this.setConversationId}
          />
        </div>
        <form className="chat-box__message-form" onSubmit={this.handleMessageSend} autoComplete="false">
          <div className="chat-box__message-input">
            <InputField
              name="message"
              label=""
              value={this.state.message}
              placeholder="Message..."
              onChange={this.handleChange}
              error=""
            />
          </div>
          <button className="chat-box__message-send-button">
            <IconSend fill={'#676b97'} />
          </button>
        </form>
      </div>
    );
  }
}

export default ChatBox;
