import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import IconBriefcase from './../../atoms/IconBriefcase/IconBriefcase';
import IconGithub from './../../atoms/IconGithub/IconGithub';
import IconLinkedin from './../../atoms/IconLinkedin/IconLinkedin';

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
      <div className="footer__icon-links">
        <a href="http://hildy.ca/" className="footer__icon-links--1">
          <IconBriefcase fill={'#fff'} />
        </a>
        <a href="https://github.com/JakeHildy" className="footer__icon-links--2">
          <IconGithub fill={'#fff'} />
        </a>
        <a href="https://www.linkedin.com/in/jacob-hildebrandt-web-dev/" className="footer__icon-links--3">
          <IconLinkedin fill={'#fff'} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
