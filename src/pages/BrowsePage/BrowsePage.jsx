import React, { Component } from 'react';
import axios from 'axios';
import './BrowsePage.scss';
import SearchField from './../../components/atoms/SearchField/SearchField';
import Listing from './../../components/atoms/Listing/Listing';
import Filters from './../../components/molecules/Filters/Filters';
import Categories from './../../components/atoms/Categories/Categories';
import categories from './../../data/categories.json';

class BrowsePage extends Component {
  state = {
    searchStr: '',
    listings: [],
    listingsLoaded: false,
    categorySort: '',
    categories: categories,
    minPrice: '',
    maxPrice: '',
    currency: 'All',
    category: 'Any',
  };

  componentDidMount = () => {
    const listingsEP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`;
    axios.get(listingsEP).then((response) => {
      this.setState({
        listings: response.data.data.listings,
        listingsLoaded: true,
      });
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCategoryChange = (e) => {
    e.preventDefault();
    this.setState({ categorySort: e.target.dataset.category });
  };

  handleSearch = (e) => {
    if (!!e) e.preventDefault();
    const { minPrice, maxPrice, currency, category } = this.state;
    let EP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}?`;
    if (minPrice) {
      EP += `price[gte]=${minPrice}`;
    }
    if (maxPrice) {
      if (minPrice) EP += '&';
      EP += `price[lte]=${maxPrice}`;
    }
    if (currency !== 'All') {
      if (minPrice || maxPrice) EP += '&';
      EP += `listCurrency=${currency}`;
    }
    if (category !== 'Any') {
      if (minPrice || maxPrice || currency !== 'All') EP += '&';
      EP += `category=${category.replace(' ', '%20')}`;
    }

    axios.get(EP).then((response) => {
      this.setState({
        listings: response.data.data.listings,
      });
    });
  };

  handleReset = (e) => {
    if (!!e) e.preventDefault();
    this.setState(
      {
        searchStr: '',
        minPrice: '',
        maxPrice: '',
        currency: 'All',
        category: 'Any',
      },
      this.handleSearch
    );
  };

  render() {
    if (!this.state.listingsLoaded) return null;
    return (
      <div className="browse-page">
        <div className="browse-page__search-bar">
          <SearchField name="searchStr" value={this.state.searchStr} onChange={this.handleChange} />
        </div>

        <div className="browse-page__container">
          <div className="browse-page__filters">
            <Filters
              minPrice={this.state.minPrice}
              maxPrice={this.state.maxPrice}
              currency={this.state.currency}
              category={this.state.category}
              handleChange={this.handleChange}
              handleSearch={this.handleSearch}
              handleReset={this.handleReset}
            />
          </div>
          <div className="browse-page__listings">
            {this.state.listings.map((listing) => (
              <Listing key={listing._id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BrowsePage;
