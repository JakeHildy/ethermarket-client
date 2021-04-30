import React from 'react';
import './ButtonSecondary.scss';

function ButtonSecondary({ label, handleClick }) {
  return (
    <button className="button-secondary" onClick={handleClick}>
      {label}
    </button>
  );
}

export default ButtonSecondary;
