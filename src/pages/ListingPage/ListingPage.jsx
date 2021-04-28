import React, { Component } from 'react';
import axios from 'axios';
import './ListingPage.scss';
import CashIcon from './../../assets/icons/local_atm_black_24dp.svg';
import Gallery from './../../components/atoms/Gallery/Gallery';
import StarRating from './../../components/atoms/StarRating/StarRating';
import Map from './../../components/atoms/Map/Map';

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
        <div className="listing-page__header">
          <div className="listing-page__gallery">
            <Gallery images={this.state.listing} />
          </div>
          <h2 className="listing-page__title">{this.state.listing.title}</h2>
          <p className="listing-page__listed-when">Updated 5 days ago in Vancouver BC.</p> {/*TODO*/}
        </div>
        <div className="listing-page__price">
          <img className="listing-page__price-icon" src={CashIcon} alt="Cash Icon" />
          <div className="listing-page__price-container">
            <h3 className="listing-page__list-price">
              {Math.round(this.state.listing.price * 10000) / 10000} {this.state.listing.listCurrency}
            </h3>
            <h4 className="listing-page__local-price">
              (${Math.round(this.state.listing.price * this.state.conversionRate) / 100} CAD)
            </h4>
          </div>
        </div>
        <div className="listing-page__user-info">
          <h2 className="listing-page__user-name">Steve Dawson</h2>
          <StarRating rating={2.5} />
          <Map lat={this.state.listing.location.lat} long={this.state.listing.location.long} />
        </div>
      </div>
    );
  }
}

export default ListingPage;
