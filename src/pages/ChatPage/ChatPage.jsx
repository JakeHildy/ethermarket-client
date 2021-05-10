import React, { Component } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { getNetwork } from './../../utils/cryptoHelpers';
import Loading from './../../components/molecules/Loading/Loading';
import ChatHeader from './../../components/molecules/ChatHeader/ChatHeader';
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
    // Ethereum Stuff:
    netId: null,
    account: null,
    balance: null,
    web3: null,
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

    this.connectToEthereum();
  }

  connectToEthereum = async () => {
    // check if MetaMask exists
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();

      //check if account is detected, then load balance & setStates.
      if (typeof accounts[0] !== 'undefined') {
        // load balance data
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({ account: accounts[0], netId, balance, web3 });
      } else {
        console.log('Please Install MetaMask');
      }
    } else {
      console.log('Please Install MetaMask');
    }
  };

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

  handleTranfer = (e) => {
    e.preventDefault();
    console.log('Handle Transfer TODO');
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

    // Ethereum constants
    const { netId, account, balance } = this.state;

    return (
      <div className="chat-page">
        <div className="chat-page__top">
          <div className="chat-page__header">
            <ChatHeader listing={listing} />
          </div>

          <div className="chat-page__buttons">
            <div className="chat-page__buttons--primary">
              <ButtonPrimary label="Transfer Funds" handleClick={this.handleTranfer} />
            </div>
            <div className="chat-page__buttons--secondary">
              <ButtonDanger label="UnFollow Listing" handleClick={this.handleUnfollow} />
            </div>
          </div>

          <div className="chat-page__account-info">
            {this.state.account ? (
              <>
                <h2 className="chat-page__account-info--title">Ethereum</h2>
                <h3 className="chat-page__account-info--label">Network:</h3>
                <p className="chat-page__account-info--text">{getNetwork(netId)}</p>
                <h3 className="chat-page__account-info--label">Account Address:</h3>
                <p className="chat-page__account-info--text">{account}</p>
                <h3 className="chat-page__account-info--label">Balance:</h3>
                <p className="chat-page__account-info--text">{`${Web3.utils.fromWei(balance)} ETH`}</p>
              </>
            ) : (
              <h2>Please Install Metamask to see account info</h2>
            )}
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
