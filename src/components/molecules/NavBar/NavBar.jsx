import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import ProfileIcon from "./../../../assets/icons/account_circle_black_24dp.svg";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/browse" className="navbar__browse-link">
          <h2 className="navbar__home-text">EtherMarket</h2>
        </Link>
        <Link to="/home" className="navbar__home-link">
          <img
            src={ProfileIcon}
            alt="Navbar Profile Icon"
            className="navbar__profile-icon"
          />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
