import React, { Component } from 'react';
import axios from 'axios';
import Gallery from './../../components/atoms/Gallery/Gallery';

export class ListingPage extends Component {
  state = {
    listing: null,
    listingLoaded: false,
  };

  componentDidMount = () => {
    const listingsEP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`;
    axios.get(`${listingsEP}/${this.props.match.params.id}`).then((response) => {
      this.setState({
        listing: response.data.data.listing,
        listingLoaded: true,
      });
    });
  };

  render() {
    if (!this.state.listingLoaded) return null;
    return (
      <div className="listing-page">
        <Gallery images={this.state.listing} />
      </div>
    );
  }
}

export default ListingPage;
