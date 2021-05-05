import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import axios from 'axios';
import ProfileIcon from './../../assets/icons/account_circle_black_24dp.svg';
import CreateNewIcon from './../../assets/icons/add_circle_black_24dp.svg';
import StarRating from './../../components/atoms/StarRating/StarRating';
import ListingSmallDetail from './../../components/molecules/ListingSmallDetail/ListingSmallDetail';

export class HomePage extends Component {
  state = {
    email: '',
    following: [],
    followedListings: [],
    followedListingsLoaded: false,
    listings: [],
    listingsLoaded: false,
    ratings: [],
    username: '',
  };

  componentDidMount = () => {
    const token = sessionStorage.getItem('authToken');
    const id = sessionStorage.getItem('userId');
    if (!token || !id) {
      this.props.history.push('/login');
    }
    axios
      .get(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_USER_EP}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { email, following, ratings, username } = res.data.data;
        this.setState({ email, following, ratings, username }, this.populateFollowingListings);
      });

    axios.get(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}?creatorId=${id}`).then((res) => {
      this.setState({ listings: res.data.data.listings, listingsLoaded: true });
    });
  };

  populateFollowingListings = () => {
    const ids = this.state.following;
    const followedListings = [];
    ids.forEach((id, i) => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}/${id}`)
        .then((res) => {
          // If the listing exists, push it to the followedListings Array.
          if (res.data.data.listing) {
            followedListings.push(res.data.data.listing);
          }
          if (i >= ids.length - 1) {
            this.setState({ followedListings, followedListingsLoaded: true });
          }
        })
        .catch((err) => {
          console.log(`💣 === ERROR GETTING LISTING (HomePage.jsx) === 💣`, err);
        });
    });
  };

  handleDetailLink = (id) => {
    this.props.history.push(`/listing/${id}`);
  };

  handleEditLink = (id) => {
    this.props.history.push(`/edit/${id}`);
  };

  handleChatLink = (id) => {
    console.log('TODO: go to chat', id);
  };

  render() {
    if (!this.state.listingsLoaded || !this.state.followedListingsLoaded) return null;
    return (
      <div className="home-page">
        <div className="home-page__user-info">
          <img className="home-page__user-profile-pic" src={ProfileIcon} alt="profile" />
          <div className="home-page__name-stars">
            <h1 className="home-page__username">{this.state.username}</h1>
            <StarRating rating="4.5" />
          </div>
        </div>

        <div className="home-page__listings-main-container">
          <div className="home-page__user-listings-container">
            <h2 className="home-page__sub-title">Your Listings:</h2>
            {this.state.listings.map((listing, i) => {
              return (
                <ListingSmallDetail
                  key={i}
                  listing={listing}
                  onClick={() => this.handleEditLink(listing._id)}
                  onChatClick={() => this.handleChatLink(listing._id)}
                />
              );
            })}
            <Link to="/create" className="home-page__new-listing-link">
              <img className="home-page__new-listing-icon" src={CreateNewIcon} alt="New Listing" />
            </Link>
          </div>

          <div className="home-page__following-listings-container">
            <h2 className="home-page__sub-title">Following:</h2>
            {this.state.followedListings.map((listing, i) => {
              return (
                <ListingSmallDetail
                  key={i}
                  listing={listing}
                  onClick={() => this.handleDetailLink(listing._id)}
                  onChatClick={() => this.handleChatLink(listing._id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
