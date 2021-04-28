import React, { Component } from 'react';
import axios from 'axios';
import './ListingPage.scss';
import ListingHeader from './../../components/molecules/ListingHeader/ListingHeader';
import ListingCreatorInfo from './../../components/molecules/ListingCreatorInfo/ListingCreatorInfo';
import ListingDetails from './../../components/molecules/ListingDetails/ListingDetails';
import ButtonPrimary from './../../components/atoms/ButtonPrimary/ButtonPrimary';

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

  followPost = () => {
    console.log('follow post button clicked');
  };

  render() {
    if (!this.state.listingLoaded) return null;
    return (
      <div className="listing-page">
        <ListingHeader listing={this.state.listing} conversionRate={this.state.conversionRate} />
        <div className="listing-page__info-container">
          <div className="listing-page__creator-info">
            <ListingCreatorInfo listing={this.state.listing} />
          </div>
          <div className="listing-page__details">
            <ListingDetails listing={this.state.listing} />
            <ButtonPrimary label="Follow Post" handleClick={this.followPost} />
          </div>
        </div>
      </div>
    );
  }
}

export default ListingPage;
