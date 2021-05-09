import React, { Component } from 'react';
import './CreateListingPage.scss';
import ListingForm from './../../components/molecules/ListingForm/ListingForm';
import IconDelete from './../../components/atoms/IconDelete/IconDelete';
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');

export class CreateListingPage extends Component {
  state = {
    listing: {
      title: '',
      price: '',
      listCurrency: 'ETH',
      category: 'Miscellaneous',
      condition: '',
      location: '',
      description: '',
      images: [],
    },
    listingLoaded: false,
    selectedFile: null,
    userId: '',
  };

  componentDidMount() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.setState({ userId });
    } else {
      this.props.history.push('/login');
    }
  }

  onPhotoChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] }, this.onPhotoUploadHandler);
  };

  onPhotoUploadHandler = (e) => {
    if (!this.state.selectedFile) return;
    const UPLOAD_EP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_UPLOAD_EP}`;
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios.post(`${UPLOAD_EP}`, data).then((res) => {
      const listing = { ...this.state.listing };
      listing.images.push(`${process.env.REACT_APP_BACKEND_EP}/${res.data.filename}`);
      this.setState({
        listing,
      });
    });
  };

  handleCreateListing = (data) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`, {
        creatorId: this.state.userId,
        posted: true,
        sold: false,
        title: data.title,
        price: data.price,
        listCurrency: data.listCurrency,
        category: data.category,
        condition: data.condition,
        location: data.location,
        description: data.description,
        images: this.state.listing.images,
        followers: [],
      })
      .then((res) => {
        const id = res.data.data.listing._id;
        this.props.history.push(`/listing/${id}`);
      })
      .catch((err) => {
        console.log(`💣 === ERROR UPLOADING LISTING === 💣`, err);
      });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleDeleteImage = (e) => {
    e.preventDefault();
    const deleteIndex = e.target.parentElement.parentElement.dataset.index;
    const listing = { ...this.state.listing };
    listing.images.splice(deleteIndex, 1);
    this.setState({ listing });
  };

  render() {
    return (
      <div className="create-listing-page">
        <h1 className="create-listing-page__title">Create Listing</h1>
        <div className="create-listing-page__add-photos">
          <input
            type="file"
            name="file"
            onChange={this.onPhotoChangeHandler}
            className="create-listing-page__add-photos-label"
          ></input>
          <div className="create-listing-page__upload-images">
            {this.state.listing.images.map((image, i) => {
              return (
                <figure key={uuidv4()} className="create-listing-page__upload-figure">
                  <img className="create-listing-page__upload-image" src={this.state.listing.images[i]} alt="1" />
                  <div data-index={i} onClick={this.handleDeleteImage} className="create-listing-page__delete-image">
                    <IconDelete fill="#f44034" />
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
        <ListingForm
          listing={this.state.listing}
          handleCancel={this.handleCancel}
          handleSubmit={this.handleCreateListing}
        />
      </div>
    );
  }
}

export default CreateListingPage;
