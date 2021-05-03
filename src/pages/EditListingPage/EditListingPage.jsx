import React, { Component } from 'react';
import './EditListingPage.scss';
import ListingForm from './../../components/molecules/ListingForm/ListingForm';
import AddPicsIcon from './../../assets/icons/add_photo_alternate_black_24dp.svg';
import DeleteIcon from './../../assets/icons/delete_forever_white_24dp.svg';
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');

export class EditListingPage extends Component {
  state = {
    listing: {
      _id: '',
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

  componentDidMount = () => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.setState({ userId });
    } else {
      this.props.history.push('/login');
    }

    const LISTING_EP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`;
    axios.get(`${LISTING_EP}/${this.props.match.params.id}`).then((res) => {
      const {
        _id,
        title,
        price,
        listCurrency,
        category,
        condition,
        location,
        description,
        images,
      } = res.data.data.listing;
      this.setState({
        listing: { _id, title, price, listCurrency, category, condition, location, description, images },
        listingLoaded: true,
      });
    });
  };

  onPhotoChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
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

  handleEditListing = (data) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}/${this.state.listing._id}`, {
        creatorId: this.state.userId,
        posted: true,
        sold: false,
        title: data.title,
        price: data.price,
        listCurrency: data.listCurrency,
        category: data.category,
        condition: data.condition,
        location: { lat: '41.40338', long: '2.17403' },
        description: data.description,
        images: this.state.listing.images,
      })
      .catch((err) => {
        console.log(`💣 === ERROR PATCHING LISTING === 💣`, err);
      });
  };

  handleCancel = (e) => {
    e.preventDefault();
    console.log('Cancel');
  };

  handleDeleteImage = (e) => {
    e.preventDefault();
    console.log('deleting image', e.target.dataset.index);
    const deleteIndex = e.target.dataset.index;
    const listing = { ...this.state.listing };
    listing.images.splice(deleteIndex, 1);
    this.setState({ listing });
  };

  handleDeleteListing = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}/${this.state.listing._id}`)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        this.props.history.push('/browse');
      })
      .catch((err) => {
        console.log(`💣 === ERROR DELETING LISTING === 💣`, err);
      });
  };

  render() {
    if (!this.state.listingLoaded) return null;
    return (
      <div className="edit-listing-page">
        <h1 className="edit-listing-page__title">Edit Listing</h1>
        <div className="edit-listing-page__add-photos">
          <input
            type="file"
            name="file"
            onChange={this.onPhotoChangeHandler}
            className="edit-listing-page__add-photos-label"
          ></input>
          <img
            onClick={this.onPhotoUploadHandler}
            className="edit-listing-page__add-photos-icon"
            src={AddPicsIcon}
            alt="Add"
          />
          <div className="edit-listing-page__upload-images">
            {this.state.listing.images.map((image, i) => {
              return (
                <figure key={uuidv4()} className="edit-listing-page__upload-figure">
                  <img className="edit-listing-page__upload-image" src={this.state.listing.images[i]} alt="1" />
                  <img
                    data-index={i}
                    onClick={this.handleDeleteImage}
                    src={DeleteIcon}
                    alt="Delete"
                    className="edit-listing-page__delete-image"
                  />
                </figure>
              );
            })}
          </div>
        </div>
        <ListingForm
          listing={this.state.listing}
          handleCancel={this.handleCancel}
          handleDelete={this.handleDeleteListing}
          handleSubmit={this.handleEditListing}
        />
      </div>
    );
  }
}

export default EditListingPage;
