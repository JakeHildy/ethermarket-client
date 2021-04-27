import React from "react";
import SearchLogo from "./../../../assets/icons/search_black_24dp.svg";
import "./SearchField.scss";

function SearchField() {
  return (
    <div className="search-field">
      <input
        className="search-field__input"
        name="search"
        placeholder="Search..."
      />
      <img src={SearchLogo} alt="Search Logo" className="search-field__icon" />
    </div>
  );
}

export default SearchField;
