import React, { Component } from 'react';
import './ListingHeader.scss';
import axios from 'axios';
import Gallery from './../../atoms/Gallery/Gallery';
import CashIcon from './../../../assets/icons/local_atm_black_24dp.svg';
import { printTime } from '../../../utils/dateTime';
import { getUSDPrice } from '../../../utils/curConversion';

class ListingHeader extends Component {
  state = { listing: this.props.listing, usdPrice: null };

  componentDidMount = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_CRYPTO_EP}?symbol=${this.state.listing.listCurrency}`
      )
      .then((res) => {
        console.log(res.data.data.quote.USD.price);
        const conversionRateUSD = res.data.data.quote.USD.price;
        this.setState({ usdPrice: this.state.listing.price * conversionRateUSD });
      });
  };

  render() {
    return (
      <div className="listing-header">
        <div className="listing-header__gallery">
          <Gallery images={this.state.listing.images} />
        </div>
        <div className="listing-header__description">
          <div className="listing-header__title-container">
            <h2 className="listing-header__title">{this.state.listing.title}</h2>
            <p className="listing-header__listed-when">{`Posted ${printTime(this.state.listing.createdAt)}`}</p>{' '}
            {/*TODO*/}
          </div>
          <div className="listing-header__price">
            <img className="listing-header__price-icon" src={CashIcon} alt="Cash Icon" />
            <div className="listing-header__price-container">
              <h3 className="listing-header__list-price">
                {Math.round(this.state.listing.price * 10000) / 10000} {this.state.listing.listCurrency}
              </h3>
              <h4 className="listing-header__local-price">(${Math.round(this.state.usdPrice * 100) / 100} USD)</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListingHeader;
