import React from 'react';
import { Link } from 'react-router-dom';
import './Listing.scss';

function Listing({ listing }) {
  return (
    <Link to={`/listing/${listing._id}`} className="listing">
      <figure className="listing__figure">
        <img src={listing.images[0]} alt={listing.title} className="listing__img" />
      </figure>
      <h4 className="listing__label">{listing.title}</h4>
      <p className="listing__price">
        {Math.round(listing.price * 10000) / 10000} {listing.listCurrency}
      </p>
    </Link>
  );
}

export default Listing;
