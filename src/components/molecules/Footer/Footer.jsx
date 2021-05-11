import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__title">&copy; EtherMarket 2021 </h2>
      <div className="footer__links">
        <Link to={'#'} className="footer__link footer__link--careers">
          Careers
        </Link>
        <Link to={'#'} className="footer__link">
          Investors
        </Link>
      </div>
    </div>
  );
}

export default Footer;
