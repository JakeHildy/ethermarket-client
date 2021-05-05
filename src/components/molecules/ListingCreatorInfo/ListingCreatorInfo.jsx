import React, { Component } from 'react';
import './ListingCreatorInfo.scss';
import StarRating from './../../atoms/StarRating/StarRating';
import Map from './../../atoms/Map/Map';
import axios from 'axios';

class ListingCreatorInfo extends Component {
  state = {
    listing: this.props.listing,
    username: null,
    ratings: null,
  };

  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_USER_EP}/simple/${this.state.listing.creatorId}`)
      .then((res) => {
        this.setState({ username: res.data.data.username, ratings: res.data.data.ratings });
      });
  };

  render() {
    const { listing } = this.state;
    return (
      <div className="listing-creator-info">
        <h2 className="listing-creator-info__user-name">{this.state.username}</h2>
        <div className="listing-creator-info__star-rating">
          <StarRating rating={2.5} />
        </div>
        <div className="listing-creator-info__map">
          <Map lat={listing.location.lat} long={listing.location.long} />
        </div>
      </div>
    );
  }
}

export default ListingCreatorInfo;
