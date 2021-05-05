import React from 'react';
import './Filters.scss';
import DropDownField from './../../atoms/DropDownField/DropDownField';
import ButtonPrimary from './../../atoms/ButtonPrimary/ButtonPrimary';
import ButtonSecondary from './../../atoms/ButtonSecondary/ButtonSecondary';
import InputField from './../../atoms/InputField/InputField';
import categories from './../../../data/categories.json';
import currencies from './../../../data/currencies.json';

function Filters({ minPrice, maxPrice, currency, category, handleChange, handleSearch, handleReset }) {
  return (
    <div className="filters">
      <h3 className="filters__title">Filters</h3>
      <div className="filters__price">
        <div className="filters__price--min">
          <InputField
            name="minPrice"
            label="Min"
            value={minPrice}
            placeholder="Min..."
            onChange={handleChange}
            error=""
          />
        </div>
        <div className="filters__price--max">
          <InputField
            name="maxPrice"
            label="Max"
            value={maxPrice}
            placeholder="Max..."
            onChange={handleChange}
            error=""
          />
        </div>
      </div>
      <div className="filters__dropdowns">
        <div className="filters__dropdowns--currency">
          <DropDownField
            name="currency"
            label="Currency"
            options={currencies}
            value={currency}
            onChange={handleChange}
            error=""
          />
        </div>
        <div className="filters__dropdowns--category">
          <DropDownField
            name="category"
            label="Category"
            options={categories}
            value={category}
            onChange={handleChange}
            error=""
          />
        </div>
      </div>
      <div className="filters__buttons">
        <div className="filters__buttons--reset">
          <ButtonSecondary label="Reset" handleClick={handleReset} />
        </div>
        <div className="filters__buttons--search">
          <ButtonPrimary label="Search" handleClick={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default Filters;
