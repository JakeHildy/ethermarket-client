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
        this.setState({ email, following, ratings, username });
      });

    axios.get(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}?creatorId=${id}`).then((res) => {
      this.setState({ listings: res.data.data.listings, listingsLoaded: true });
    });
  };

  populateFollowingListings = () => {};

  handleDetailLink = (id) => {
    console.log('go to detail', id);
  };

  handleEditLink = (id) => {
    this.props.history.push(`/edit/${id}`);
  };

  handleChatLink = (id) => {
    console.log('go to chat', id);
  };

  render() {
    if (!this.state.listingsLoaded) return null;
    return (
      <div className="home-page">
        <div className="home-page__user-info">
          <img className="home-page__user-profile-pic" src={ProfileIcon} alt="profile" />
          <div className="home-page__name-stars">
            <h1 className="home-page__username">{this.state.username}</h1>
            <StarRating rating="4.5" />
          </div>
        </div>
        <h2 className="home-page__sub-title">Your Listings:</h2>
        <div className="home-page__user-listings-container">
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
        <h2 className="home-page__sub-title">Following:</h2>
        <div className="home-page__following-listings-container"></div>

        {/* <Link to="/edit/608d7ac24a3b6f241c769696">Edit Posting</Link> */}
      </div>
    );
  }
}

export default HomePage;
