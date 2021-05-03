import React from 'react';
import './ListingSmallDetail.scss';
import CashIcon from './../../../assets/icons/local_atm_black_24dp.svg';
import ChatIcon from './../../../assets/icons/chat_black_24dp.svg';

function ListingSmallDetail({ listing }) {
  const conversionRate = 0.34;
  return (
    <div className="listing-small-detail">
      <figure className="listing-small-detail__figure">
        <img className="listing-small-detail__img" src={listing.images[0]} alt={listing.title} />
      </figure>
      <div className="listing-small-detail__details">
        <h3 className="listing-small-detail__title">{listing.title}</h3>
        <div className="listing-small-detail__price">
          <img className="listing-small-detail__price-icon" src={CashIcon} alt="Cash Icon" />
          <div className="listing-small-detail__price-container">
            <h3 className="listing-small-detail__list-price">
              {Math.round(listing.price * 10000) / 10000} {listing.listCurrency}
            </h3>
            <h4 className="listing-small-detail__local-price">
              (${Math.round(listing.price * conversionRate) / 100} CAD)
            </h4>
          </div>
        </div>
      </div>
      <img className="listing-small-detail__chat-icon" src={ChatIcon} alt="chat" />
    </div>
  );
}

export default ListingSmallDetail;
