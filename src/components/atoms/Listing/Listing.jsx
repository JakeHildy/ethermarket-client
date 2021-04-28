import React from "react";
import "./Listing.scss";

function Listing({ listing }) {
  return (
    <div className="listing">
      <figure className="listing__figure">
        <img
          src={listing.images[0].url}
          alt={listing.title}
          className="listing__img"
        />
      </figure>
      <h4 className="listing__label">{listing.title}</h4>
      <p className="listing__price">
        {console.log(typeof listing.price)}
        {Math.round(listing.price * 10000) / 10000} {listing.listCurrency}
      </p>
    </div>
  );
}

export default Listing;
