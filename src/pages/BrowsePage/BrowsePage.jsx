import React, { Component } from "react";
import axios from "axios";
import "./BrowsePage.scss";
import SearchField from "./../../components/atoms/SearchField/SearchField";
import Listing from "./../../components/atoms/Listing/Listing";

class BrowsePage extends Component {
  state = {
    searchStr: "",
    listings: [],
    listingsLoaded: false,
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

        <div className="browse-page__listings-container">
          {this.state.listings.map((listing) => (
            <Listing key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    );
  }
}

export default BrowsePage;
