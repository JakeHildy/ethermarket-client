import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import axios from 'axios';
import ProfileIcon from './../../assets/icons/account_circle_black_24dp.svg';
import CreateNewIcon from './../../assets/icons/add_circle_black_24dp.svg';
import StarRating from './../../components/atoms/StarRating/StarRating';

export class HomePage extends Component {
  state = {
    email: '',
    following: [],
    listings: [],
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
        const { email, following, listings, ratings, username } = res.data.data;
        this.setState({ email, following, listings, ratings, username });
      });
  };

  render() {
    return (
      <div className="home-page">
        <div className="home-page__user-info">
          <img className="home-page__user-profile-pic" src={ProfileIcon} />
          <div className="home-page__name-stars">
            <h1 className="home-page__username">{this.state.username}</h1>
            <StarRating rating="4.5" />
          </div>
        </div>
        <h2 className="home-page__sub-title">Your Listings:</h2>
        <div className="home-page__user-listings-container">
          <Link to="/create">
            <img className="home-page__new-listing-icon" src={CreateNewIcon} />
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
