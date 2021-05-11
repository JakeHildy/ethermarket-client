import React, { Component } from 'react';
import './EditListingPage.scss';
import ListingForm from './../../components/molecules/ListingForm/ListingForm';
import { toast } from 'react-toastify';
import Loading from './../../components/molecules/Loading/Loading';
import IconDelete from './../../components/atoms/IconDelete/IconDelete';
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
        location: data.location,
        description: data.description,
        images: this.state.listing.images,
      })
      .then(() => {
        this.props.history.push(`/listing/${this.state.listing._id}`);
        toast.success('Listing Updated!');
      })
      .catch((err) => {
        console.log(`💣 === ERROR PATCHING LISTING === 💣`, err);
        toast.error('An Unknown Error has occured');
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

  handleDeleteListing = (e) => {
    const { showModal } = this.props;
    e.preventDefault();
    showModal(`Are you sure you want to delete ${this.state.listing.title} listing?`, () => {
      this.deleteListing();
    });
  };

  deleteListing = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}/${this.state.listing._id}`)
      .then((res) => {
        // console.log(res);
      })
      .then(() => {
        this.props.history.push('/browse');
        toast.success('Listing Deleted!');
      })
      .catch((err) => {
        console.log(`💣 === ERROR DELETING LISTING === 💣`, err);
        toast.error('Error Deleting Listing');
      });
  };

  render() {
    if (!this.state.listingLoaded) return <Loading />;
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
          <div className="edit-listing-page__upload-images">
            {this.state.listing.images.map((image, i) => {
              return (
                <figure key={uuidv4()} className="edit-listing-page__upload-figure">
                  <img className="edit-listing-page__upload-image" src={this.state.listing.images[i]} alt="1" />
                  <div data-index={i} onClick={this.handleDeleteImage} className="edit-listing-page__delete-image">
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
          handleDelete={this.handleDeleteListing}
          handleSubmit={this.handleEditListing}
        />
      </div>
    );
  }
}

export default EditListingPage;
