import React, { Component } from 'react';
import axios from 'axios';
import Loading from './../../components/molecules/Loading/Loading';
import ChatHeader from './../../components/molecules/ChatHeader/ChatHeader';
import ChatBox from './../../components/molecules/ChatBox/ChatBox';
import './ChatPage.scss';

export class ChatPage extends Component {
  state = { listing: null, listingLoaded: false, myListing: false };

  componentDidMount = () => {
    const listingsEP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`;
    axios
      .get(`${listingsEP}/${this.props.match.params.id}`)
      .then((response) => {
        const listing = response.data.data.listing;
        const userId = sessionStorage.getItem('userId');
        this.setState({
          listing,
          listingLoaded: true,
          myListing: userId === listing.creatorId,
        });
      })
      .catch((err) => {
        console.log(`💣 === ERROR GETTING LISTING (ChatPage.jsx) === 💣`, err);
      });
  };

  render() {
    if (!this.state.listingLoaded) return <Loading />;
    return (
      <div className="chat-page">
        <ChatHeader listing={this.state.listing} />
        <ChatBox />
      </div>
    );
  }
}

export default ChatPage;
