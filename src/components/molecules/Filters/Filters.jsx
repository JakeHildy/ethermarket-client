import React, { Component } from 'react';
import './Filters.scss';
import DropDownField from './../../atoms/DropDownField/DropDownField';
import ButtonPrimary from './../../atoms/ButtonPrimary/ButtonPrimary';
import ButtonSecondary from './../../atoms/ButtonSecondary/ButtonSecondary';
import InputField from './../../atoms/InputField/InputField';
import categories from './../../../data/categories.json';
import currencies from './../../../data/currencies.json';
import ExpandMoreIcon from './../../../assets/icons/expand_more_black_24dp.svg';
import ExpandLessIcon from './../../../assets/icons/expand_less_black_24dp.svg';

class Filters extends Component {
  state = { shown: false };

  toggleShown = (e) => {
    e.preventDefault();
    this.setState({ shown: !this.state.shown });
  };

  render() {
    const { minPrice, maxPrice, currency, category, handleChange, handleFilter, handleReset } = this.props;
    const { shown } = this.state;
    return (
      <div className="filters">
        <div className="filters__title">
          <h3 className="filters__title-text">Filters</h3>
          <img
            onClick={this.toggleShown}
            src={shown ? ExpandLessIcon : ExpandMoreIcon}
            alt="Toggle Filters"
            className="filters__toggle-icon"
          />
        </div>

        <div className={`filters__container ${shown ? 'filters__container--shown' : ''}`}>
          <div className="filters__price">
            <div className="filters__price--min">
              <InputField
                name="minPrice"
                label="Min Price"
                value={minPrice}
                placeholder="Min..."
                onChange={handleChange}
                error=""
              />
            </div>
            <div className="filters__price--max">
              <InputField
                name="maxPrice"
                label="Max Price"
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
                options={['All', ...currencies]}
                value={currency}
                onChange={handleChange}
                error=""
              />
            </div>
            <div className="filters__dropdowns--category">
              <DropDownField
                name="category"
                label="Category"
                options={['Any', ...categories]}
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
              <ButtonPrimary label="Search" handleClick={handleFilter} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
