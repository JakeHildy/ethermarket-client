import React, { Component } from 'react';
import axios from 'axios';
import './ChatHeader.scss';
import CashIcon from './../../../assets/icons/local_atm_black_24dp.svg';

class ChatHeader extends Component {
  state = { listing: this.props.listing, usdPrice: null };

  componentDidMount = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_CRYPTO_EP}?symbol=${this.state.listing.listCurrency}`
      )
      .then((res) => {
        const conversionRateUSD = res.data.data.quote.USD.price;
        this.setState({ usdPrice: this.state.listing.price * conversionRateUSD });
      });
  };

  render() {
    const { listing } = this.props;
    return (
      <div className="chat-header">
        <figure className="chat-header__figure">
          <img className="chat-header__img" src={listing.images[0]} alt={listing.title} />
        </figure>
        <div className="chat-header__details">
          <h3 className="chat-header__title">{listing.title}</h3>
          <div className="chat-header__price">
            <img className="chat-header__price-icon" src={CashIcon} alt="Cash Icon" />
            <div className="chat-header__price-container">
              <h3 className="chat-header__list-price">
                {Math.round(listing.price * 10000) / 10000} {listing.listCurrency}
              </h3>
              <h4 className="chat-header__local-price">(${Math.round(this.state.usdPrice * 100) / 100} USD)</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatHeader;
