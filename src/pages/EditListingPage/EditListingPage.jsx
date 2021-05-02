import React, { Component } from 'react';
import './EditListingPage.scss';
import InputField from './../../components/atoms/InputField/InputField';
import TextArea from './../../components/atoms/TextArea/TextArea';
import DropDownField from './../../components/atoms/DropDownField/DropDownField';
import ButtonPrimary from './../../components/atoms/ButtonPrimary/ButtonPrimary';
import ButtonSecondary from './../../components/atoms/ButtonSecondary/ButtonSecondary';
import ButtonDanger from './../../components/atoms/ButtonDanger/ButtonDanger';
import AddPicsIcon from './../../assets/icons/add_photo_alternate_black_24dp.svg';
import DeleteIcon from './../../assets/icons/delete_forever_white_24dp.svg';
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');

export class EditListingPage extends Component {
  state = {
    _id: '',
    title: '',
    titleError: '',
    price: '',
    priceError: '',
    listCurrency: 'ETH',
    category: 'Miscellaneous',
    condition: '',
    location: '',
    description: '',
    descriptionError: '',
    images: [],
    selectedFile: null,
    userId: '123456',
  };

  componentDidMount = () => {
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
        _id,
        title,
        price,
        listCurrency,
        category,
        condition,
        location,
        description,
        images,
      });
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onPhotoChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  onPhotoUploadHandler = (e) => {
    const UPLOAD_EP = `${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_UPLOAD_EP}`;
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios.post(`${UPLOAD_EP}`, data).then((res) => {
      const images = [...this.state.images];
      images.push(`${process.env.REACT_APP_BACKEND_EP}/${res.data.filename}`);
      this.setState({
        images,
      });
    });
  };

  handleEditListing = (e) => {
    e.preventDefault();

    // Validation
    let titleError = '';
    if (!this.state.title) {
      titleError = 'Title Required';
    }
    let priceError = '';
    if (!this.state.price) {
      priceError = 'Price Required';
    }
    if (this.state.price < 0) {
      priceError = "Price can't be negative";
    }
    if (!Number(this.state.price)) {
      priceError = 'Enter valid number';
    }
    let descriptionError = '';
    if (!this.state.description) {
      descriptionError = 'Description Required';
    }

    this.setState(
      {
        titleError,
        priceError,
        descriptionError,
      },
      () => {
        if (titleError || priceError || descriptionError) {
          return;
        }
        axios
          .patch(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}/${this.state._id}`, {
            creatorId: this.state.userId,
            posted: true,
            sold: false,
            title: this.state.title,
            price: this.state.price,
            listCurrency: this.state.listCurrency,
            category: this.state.category,
            condition: this.state.condition,
            location: { lat: '41.40338', long: '2.17403' },
            description: this.state.description,
            images: this.state.images,
            followers: [],
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(`💣 === ERROR PATCHING LISTING === 💣`, err);
          });
      }
    );
  };

  handleCancel = (e) => {
    e.preventDefault();
    console.log('Cancel');
  };

  handleDeleteImage = (e) => {
    e.preventDefault();
    const deleteIndex = e.target.dataset.index;
    const images = [...this.state.images];
    images.splice(deleteIndex, 1);
    this.setState({ images });
  };

  handleDeleteListing = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}/${this.state._id}`)
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
            alt="Add photos"
          />
          <div className="edit-listing-page__upload-images">
            {this.state.images.map((image, i) => {
              return (
                <figure key={uuidv4()} className="edit-listing-page__upload-figure">
                  <img className="edit-listing-page__upload-image" src={this.state.images[i]} alt="image-1" />
                  <img
                    data-index={i}
                    onClick={this.handleDeleteImage}
                    src={DeleteIcon}
                    alt="Delete Image"
                    className="edit-listing-page__delete-image"
                  />
                </figure>
              );
            })}
          </div>
        </div>

        <div className="edit-listing-page__container-bottom">
          <div className="edit-listing-page__container-bottom-left">
            <InputField
              name="title"
              label="Title *"
              value={this.state.title}
              placeholder="Enter Title..."
              onChange={this.handleChange}
              error={this.state.titleError}
            />
            <div className="edit-listing-page__currency-input">
              <div className="edit-listing-page__amount">
                <InputField
                  name="price"
                  label="Price *"
                  value={this.state.price}
                  placeholder="Enter Price..."
                  onChange={this.handleChange}
                  error={this.state.priceError}
                />
              </div>
              <div className="edit-listing-page__currency">
                <DropDownField
                  name="listCurrency"
                  label="Currency"
                  options={['ETH', 'BTC']}
                  value={this.state.listCurrency}
                  onChange={this.handleChange}
                  error=""
                />
              </div>
            </div>
            <DropDownField
              name="category"
              label="Category"
              options={['Miscellaneous', 'Home', 'Clothing', 'Electronics', 'Hobbies', 'Entertainment', 'Sporting']}
              value={this.state.category}
              onChange={this.handleChange}
              error=""
            />
            <InputField
              name="condition"
              label="Condition"
              value={this.state.condition}
              placeholder="Enter Condition..."
              onChange={this.handleChange}
              error=""
            />
          </div>
          <div className="edit-listing-page__container-bottom-right">
            <InputField
              name="location"
              label="Location"
              value={this.state.location}
              placeholder="Enter Postal Code..."
              onChange={this.handleChange}
              error=""
            />
            <TextArea
              name="description"
              label="Description *"
              value={this.state.description}
              placeholder="Enter Description..."
              onChange={this.handleChange}
              error={this.state.descriptionError}
            />
            <div className="edit-listing-page__buttons">
              <div className="edit-listing-page__button-cancel">
                <ButtonSecondary label="Cancel" handleClick={this.handleCancel} />
              </div>
              <div className="edit-listing-page__button-cancel">
                <ButtonDanger label="Delete" handleClick={this.handleDeleteListing} />
              </div>
              <div className="edit-listing-page__button-create">
                <ButtonPrimary label="Submit" handleClick={this.handleEditListing} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditListingPage;
