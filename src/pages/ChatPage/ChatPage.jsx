import React, { Component } from 'react';
import axios from 'axios';
import Loading from './../../components/molecules/Loading/Loading';
import ChatHeader from './../../components/molecules/ChatHeader/ChatHeader';
import ChatBox from './../../components/molecules/ChatBox/ChatBox';
import './ChatPage.scss';

export class ChatPage extends Component {
  state = { listing: null, listingLoaded: false, isMyListing: false };

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
          isMyListing: userId === listing.creatorId,
        });
      })
      .catch((err) => {
        console.log(`💣 === ERROR GETTING LISTING (ChatPage.jsx) === 💣`, err);
      });
  };

  render() {
    // Stakeholders are the people you would be chatting with about this posting.
    // If its your posting, stakeholders would be the followers.
    // If its a posting your following, stakeholders would just be the owner.
    if (!this.state.listingLoaded) return <Loading />;
    const { listing, isMyListing } = this.state;
    let stakeholders = [];
    if (isMyListing) {
      stakeholders = listing.followers;
    } else {
      stakeholders = listing.creatorId;
    }

    return (
      <div className="chat-page">
        <ChatHeader listing={this.state.listing} />
        <ChatBox stakeholders={} />
      </div>
    );
  }
}

export default ChatPage;
