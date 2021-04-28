import React, { Component } from 'react';
import axios from 'axios';
import './ListingPage.scss';
import ListingHeader from './../../components/molecules/ListingHeader/ListingHeader';
import ListingCreatorInfo from './../../components/molecules/ListingCreatorInfo/ListingCreatorInfo';
import ListingDetails from './../../components/molecules/ListingDetails/ListingDetails';

export class ListingPage extends Component {
  state = {
    listing: null,
    listingLoaded: false,
    conversionRate: 3000,
  };

  componentDidMount = () => {
    const listingsEP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`;
    axios.get(`${listingsEP}/${this.props.match.params.id}`).then((response) => {
      this.setState({
        listing: response.data.data.listing,
        listingLoaded: true,
      });
    });
  };

  render() {
    if (!this.state.listingLoaded) return null;
    return (
      <div className="listing-page">
        <ListingHeader listing={this.state.listing} conversionRate={this.state.conversionRate} />
        <div className="listing-page__creator-info">
          <ListingCreatorInfo listing={this.state.listing} />
        </div>
        <div className="listing-page__details">
          <ListingDetails listing={this.state.listing} />
        </div>
        <button className="listing-page__follow-button">Follow Post</button>
      </div>
    );
  }
}

export default ListingPage;
