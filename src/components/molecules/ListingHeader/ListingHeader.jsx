import React from 'react';
import './ListingHeader.scss';
import Gallery from './../../atoms/Gallery/Gallery';
import CashIcon from './../../../assets/icons/local_atm_black_24dp.svg';

function ListingHeader({ listing, conversionRate }) {
  return (
    <div className="listing-header">
      <div className="listing-header__gallery">
        <Gallery images={listing.images} />
      </div>
      <div className="listing-header__description">
        <div className="listing-header__title-container">
          <h2 className="listing-header__title">{listing.title}</h2>
          <p className="listing-header__listed-when">Updated 5 days ago in Vancouver BC.</p> {/*TODO*/}
        </div>
        <div className="listing-header__price">
          <img className="listing-header__price-icon" src={CashIcon} alt="Cash Icon" />
          <div className="listing-header__price-container">
            <h3 className="listing-header__list-price">
              {Math.round(listing.price * 10000) / 10000} {listing.listCurrency}
            </h3>
            <h4 className="listing-header__local-price">(${Math.round(listing.price * conversionRate) / 100} CAD)</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingHeader;
