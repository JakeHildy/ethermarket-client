import React from 'react';
import './ButtonPrimary.scss';

function ButtonPrimary({ label, handleClick }) {
  return (
    <button className="button-primary" onClick={handleClick}>
      {label}
    </button>
  );
}

export default ButtonPrimary;
