import React from 'react';
import './ListingDetails.scss';
import BikeIcon from './../../../assets/icons/pedal_bike_black_24dp.svg';

function ListingDetails({ listing }) {
  return (
    <div className="listing-details">
      <h2 className="listing-details__title">Details</h2>
      <div className="listing-details__category">
        <img src={BikeIcon} alt="Category Logo" />
        <h3 className="listing-details__label">Sporting</h3>
      </div>
      <p className="listing-details__text">{listing.description}</p>
    </div>
  );
}

export default ListingDetails;
