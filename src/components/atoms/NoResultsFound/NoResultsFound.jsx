import React from 'react';
import './NoResultsFound.scss';
import EthLogo from './../../../assets/icons/eth-logo.png';

function NoResultsFound() {
  return (
    <div className="no-results-found">
      <img className="no-results-found__logo" src={EthLogo} alt="Eth Logo" />
      <h3 className="no-results-found__text">No Results Found...</h3>
    </div>
  );
}

export default NoResultsFound;
