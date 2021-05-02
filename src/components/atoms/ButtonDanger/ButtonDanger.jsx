import React from 'react';
import './ButtonDanger.scss';

function ButtonDanger({ label, handleClick }) {
  return (
    <button className="button-danger" onClick={handleClick}>
      {label}
    </button>
  );
}

export default ButtonDanger;
