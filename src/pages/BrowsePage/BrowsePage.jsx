import React, { Component } from "react";
import axios from "axios";
import "./BrowsePage.scss";
import SearchField from "./../../components/atoms/SearchField/SearchField";
import Listing from "./../../components/atoms/Listing/Listing";
import Categories from "./../../components/atoms/Categories/Categories";

class BrowsePage extends Component {
  state = {
    searchStr: "",
    listings: [],
    listingsLoaded: false,
    categorySort: "",
    categories: [
      "Home & Garden",
      "Clothing",
      "Electronics",
      "Hobbies",
      "Entertainment",
      "Sporting Goods",
    ],
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

  render() {
    if (!this.state.listingsLoaded) return null;
    return (
      <div className="browse-page">
        <div className="browse-page__search-bar">
          <SearchField
            name="searchStr"
            value={this.state.searchStr}
            onChange={this.handleChange}
          />
        </div>
        <div className="browse-page__container">
          <div className="browse-page__categories">
            <Categories
              categories={this.state.categories}
              handleChange={this.handleCategoryChange}
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
