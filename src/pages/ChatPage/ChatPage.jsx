import React, { Component } from 'react';
import axios from 'axios';
import Loading from './../../components/molecules/Loading/Loading';
import ChatHeader from './../../components/molecules/ChatHeader/ChatHeader';
import Wallet from './../../components/molecules/Wallet/Wallet';
import ChatBox from './../../components/molecules/ChatBox/ChatBox';
import ButtonPrimary from './../../components/atoms/ButtonPrimary/ButtonPrimary';
import ButtonDanger from './../../components/atoms/ButtonDanger/ButtonDanger';
import './ChatPage.scss';

export class ChatPage extends Component {
  state = {
    listing: null,
    creator: null,
    creatorLoaded: false,
    listingLoaded: false,
    isMyListing: false,
    followers: null,
    followersLoaded: false,
    showWallet: false,
  };

  componentDidMount() {
    const listingsEP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`;
    const usersEP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_USER_EP}`;
    axios
      .get(`${listingsEP}/${this.props.match.params.id}`)
      .then((response) => {
        const listing = response.data.data.listing;
        const userId = sessionStorage.getItem('userId');
        this.setState(
          {
            listing,
            listingLoaded: true,
            isMyListing: userId === listing.creatorId,
          },
          this.getCreatorInfo
        );
      })
      .catch((err) => {
        console.log(`💣 === ERROR GETTING LISTING (ChatPage.jsx) === 💣`, err);
      });
    axios
      .get(`${usersEP}/follow/${this.props.match.params.id}`)
      .then((response) => {
        const followers = response.data.followers;
        this.setState({
          followers,
          followersLoaded: true,
        });
      })
      .catch((err) => {
        console.log(`💣 === ERROR GETTING LISTING FOLLOWERS (ChatPage.jsx) === 💣`, err);
      });
  }

  getCreatorInfo = () => {
    const usersEP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_USER_EP}`;
    axios
      .get(`${usersEP}/simple/${this.state.listing.creatorId}`)
      .then((response) => {
        const creator = response.data.data;
        this.setState({
          creator,
          creatorLoaded: true,
        });
      })
      .catch((err) => {
        console.log(`💣 === ERROR GETTING CREATOR INFO (ChatPage.jsx) === 💣`, err);
      });
  };

  handleShowWallet = (e) => {
    e.preventDefault();
    this.setState({ showWallet: true });
  };

  handleUnfollow = (e) => {
    e.preventDefault();
    console.log('Handle Unfollow TODO');
  };

  render() {
    // Stakeholders are the people you would be chatting with about this posting.
    // If its your posting, stakeholders would be the followers.
    // If its a posting your following, stakeholders would just be the owner.
    if (!this.state.listingLoaded || !this.state.followersLoaded || !this.state.creatorLoaded) return <Loading />;
    const { listing, isMyListing, followers, creator } = this.state;
    let stakeholders = [];
    if (isMyListing) {
      stakeholders = followers;
    } else {
      stakeholders = [creator];
    }

    return (
      <div className="chat-page">
        <div className="chat-page__top">
          <div className="chat-page__header">
            <ChatHeader listing={listing} />
          </div>

          <div className="chat-page__buttons">
            <div className="chat-page__buttons--primary">
              <ButtonPrimary label="Connect Wallet" handleClick={this.handleShowWallet} />
            </div>
            {/* <div className="chat-page__buttons--secondary">
              <ButtonDanger label="UnFollow Listing" handleClick={this.handleUnfollow} />
            </div> */}
          </div>

          <div className="chat-page__account-info">
            {this.state.showWallet ? <Wallet listing={listing} /> : <h2>Install Metamask to use Crypto</h2>}
          </div>
        </div>
        <div className="chat-page__conv-box">
          <ChatBox stakeholders={stakeholders} listingId={listing._id} creatorUsername={this.state.creator.username} />
        </div>
      </div>
    );
  }
}

export default ChatPage;
