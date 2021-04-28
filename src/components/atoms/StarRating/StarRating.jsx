import React from 'react';
import './StarRating.scss';
import FullStar from './../../../assets/icons/star_black_24dp.svg';
import HalfStar from './../../../assets/icons/star_half_black_24dp.svg';
import EmptyStar from './../../../assets/icons/star_outline_black_24dp.svg';

function StarRating({ rating }) {
  const starLength = 5;
  const starArray = [];
  for (let i = 1; i <= starLength; i++) {
    if (rating - i >= 0) starArray.push(FullStar);
    else if (rating - i <= 0 && rating - i > -1) starArray.push(HalfStar);
    else starArray.push(EmptyStar);
  }
  return (
    <div className="star-rating">
      {starArray.map((star, i) => (
        <img key={i} className="star-rating__star" src={star} alt="Star" />
      ))}
    </div>
  );
}

export default StarRating;
