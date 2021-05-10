import React, { Component } from 'react';
import axios from 'axios';
import './ListingSmallDetail.scss';
import CashIcon from './../../../assets/icons/local_atm_black_24dp.svg';
import ChatIcon from './../../../assets/icons/chat_black_24dp.svg';

class ListingSmallDetail extends Component {
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
    const { listing, onClick, onChatClick } = this.props;
    return (
      <div className="listing-small-detail">
        <figure onClick={onClick} className="listing-small-detail__figure">
          <img className="listing-small-detail__img" src={listing.images[0]} alt={listing.title} />
        </figure>
        <div onClick={onClick} className="listing-small-detail__details">
          <h3 className="listing-small-detail__title">{listing.title}</h3>
          <div className="listing-small-detail__price">
            <img className="listing-small-detail__price-icon" src={CashIcon} alt="Cash Icon" />
            <div className="listing-small-detail__price-container">
              <h3 className="listing-small-detail__list-price">
                {Math.round(listing.price * 10000) / 10000} {listing.listCurrency}
              </h3>
              <h4 className="listing-small-detail__local-price">
                (${Math.round(this.state.usdPrice * 100) / 100} USD)
              </h4>
            </div>
          </div>
        </div>
        <img onClick={onChatClick} className="listing-small-detail__chat-icon" src={ChatIcon} alt="chat" />
      </div>
    );
  }
}

export default ListingSmallDetail;
