import React from 'react';
import './Loading.scss';
import EthLogo from './../../../assets/icons/eth-logo.png';

function Loading() {
  return (
    <div className="loading">
      <img className="loading__logo" src={EthLogo} alt="Eth Logo" />
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
