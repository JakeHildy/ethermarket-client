import React from 'react';
import './ListingDetails.scss';

function ListingDetails({ listing }) {
  return (
    <div className="listing-details">
      <h2 className="listing-details__title">Details</h2>
      <div className="listing-details__category">
        <h3 className="listing-details__label">Category:</h3>
        <p className="listing-details__text">{listing.category}</p>
      </div>
      <div className="listing-details__category">
        <h3 className="listing-details__label">Condition:</h3>
        <p className="listing-details__text">{listing.condition}</p>
      </div>
      <h3 className="listing-details__label">Description:</h3>
      <p className="listing-details__text listing-details__text--paragraph">{listing.description}</p>
    </div>
  );
}

export default ListingDetails;
