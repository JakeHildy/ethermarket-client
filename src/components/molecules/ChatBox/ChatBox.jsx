import React, { Component } from 'react';
import './ChatBox.scss';

export class ChatBox extends Component {
  state = { activeId: 0 };

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

  render() {
    const { stakeholders } = this.props;
    const { activeId } = this.state;
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
        <div className="chat-box__message-area"></div>
      </div>
    );
  }
}

export default ChatBox;
