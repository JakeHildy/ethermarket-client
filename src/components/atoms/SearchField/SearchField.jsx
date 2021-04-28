import React from "react";
import SearchLogo from "./../../../assets/icons/search_black_24dp.svg";
import "./SearchField.scss";

function SearchField({ name, value, onChange }) {
  return (
    <div className="search-field">
      <input
        value={value}
        className="search-field__input"
        name={name}
        onChange={onChange}
        placeholder="Search..."
      />
      <img src={SearchLogo} alt="Search Logo" className="search-field__icon" />
    </div>
  );
}

export default SearchField;
