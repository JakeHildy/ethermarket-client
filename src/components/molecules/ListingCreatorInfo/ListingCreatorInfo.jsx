import React from 'react';
import './ListingCreatorInfo.scss';
import StarRating from './../../atoms/StarRating/StarRating';
import Map from './../../atoms/Map/Map';

function ListingCreatorInfo({ listing }) {
  return (
    <div className="listing-creator-info">
      <h2 className="listing-creator-info__user-name">Steve Dawson</h2>
      <div className="listing-creator-info__star-rating">
        <StarRating rating={2.5} />
      </div>
      <div className="listing-creator-info__map">
        <Map lat={listing.location.lat} long={listing.location.long} />
      </div>
    </div>
  );
}

export default ListingCreatorInfo;
