import React, { Component } from 'react';
import axios from 'axios';
import './ListingPage.scss';
import ListingHeader from './../../components/molecules/ListingHeader/ListingHeader';
import Loading from './../../components/molecules/Loading/Loading';
import ListingCreatorInfo from './../../components/molecules/ListingCreatorInfo/ListingCreatorInfo';
import ListingDetails from './../../components/molecules/ListingDetails/ListingDetails';
import ButtonPrimary from './../../components/atoms/ButtonPrimary/ButtonPrimary';

export class ListingPage extends Component {
  state = {
    listing: null,
    listingLoaded: false,
    conversionRate: 3000,
    myListing: false,
  };

  componentDidMount = () => {
    const listingsEP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`;
    axios
      .get(`${listingsEP}/${this.props.match.params.id}`)
      .then((response) => {
        const listing = response.data.data.listing;
        const userId = sessionStorage.getItem('userId');
        this.setState({
          listing,
          listingLoaded: true,
          myListing: userId === listing.creatorId,
        });
      })
      .catch((err) => {
        console.log(`💣 === ERROR GETTING LISTING (ListingPage.jsx) === 💣`, err);
      });
  };

  followPost = () => {
    const token = sessionStorage.getItem('authToken');
    const id = sessionStorage.getItem('userId');

    // If there is no user id or token go to login.
    if (!token || !id) {
      this.props.history.push('/login');
      return;
    }

    // If this is the users listing, redirect to the edit page.
    if (this.state.myListing) {
      this.props.history.push(`/edit/${this.state.listing._id}`);
      return;
    }

    // If the user is logged in, grab the following array.
    axios
      .get(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_USER_EP}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { following } = res.data.data;

        // If the listing is not already followed, add it.
        if (!following.includes(this.state.listing._id)) {
          axios
            .patch(
              `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_USER_EP}/follow/${this.state.listing._id}`,
              { userId: id },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .catch((err) => {
              console.log(`💣 === ERROR ADDING FOLLOWING LISTING TO USER (ListingPage.jsx) === 💣`, err);
            });
        }

        // TODO: PUSH USER TO THAT CHAT PAGE
        console.log('TODO: push user to corresponding chat page');
      })
      .catch((err) => {
        console.log(`💣 === ERROR USER PROFILE (ListingPage.jsx) === 💣`, err);
      });
  };

  render() {
    if (!this.state.listingLoaded) return <Loading />;
    return (
      <div className="listing-page">
        <ListingHeader listing={this.state.listing} conversionRate={this.state.conversionRate} />
        <div className="listing-page__info-container">
          <div className="listing-page__creator-info">
            <ListingCreatorInfo listing={this.state.listing} />
          </div>
          <div className="listing-page__details">
            <ListingDetails listing={this.state.listing} />
            <ButtonPrimary label={this.state.myListing ? 'Edit' : 'Follow Post'} handleClick={this.followPost} />
          </div>
        </div>
      </div>
    );
  }
}

export default ListingPage;
