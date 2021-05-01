import React, { Component } from 'react';
import './CreateListingPage.scss';
import InputField from './../../components/atoms/InputField/InputField';
import TextArea from './../../components/atoms/TextArea/TextArea';
import DropDownField from './../../components/atoms/DropDownField/DropDownField';
import ButtonPrimary from './../../components/atoms/ButtonPrimary/ButtonPrimary';
import ButtonSecondary from './../../components/atoms/ButtonSecondary/ButtonSecondary';
import AddPicsIcon from './../../assets/icons/add_photo_alternate_black_24dp.svg';
import DeleteIcon from './../../assets/icons/delete_forever_white_24dp.svg';
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');

export class CreateListingsPage extends Component {
  state = {
    title: '',
    price: '',
    listCurrency: 'ETH',
    category: 'Miscellaneous',
    condition: '',
    location: '',
    images: [],
    selectedFile: null,
    userId: '123456',
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

  handleCreateListing = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LISTINGS_EP}`, {
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
        console.log(`💣 === ERROR UPLOADING LISTING === 💣`, err);
      });
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
          <img
            onClick={this.onPhotoUploadHandler}
            className="create-listing-page__add-photos-icon"
            src={AddPicsIcon}
            alt="Add photos"
          />
          <div className="create-listing-page__upload-images">
            {this.state.images.map((image, i) => {
              return (
                <figure key={uuidv4()} className="create-listing-page__upload-figure">
                  <img className="create-listing-page__upload-image" src={this.state.images[i]} alt="image-1" />
                  <img
                    data-index={i}
                    onClick={this.handleDeleteImage}
                    src={DeleteIcon}
                    alt="Delete Image"
                    className="create-listing-page__delete-image"
                  />
                </figure>
              );
            })}
          </div>
        </div>
        <InputField
          name="title"
          label="Title"
          value={this.state.title}
          placeholder="Enter Title..."
          onChange={this.handleChange}
          error=""
        />
        <div className="create-listing-page__currency-input">
          <div className="create-listing-page__amount">
            <InputField
              name="price"
              label="Price"
              value={this.state.price}
              placeholder="Enter Price..."
              onChange={this.handleChange}
              error=""
            />
          </div>
          <div className="create-listing-page__currency">
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
          label="Description"
          value={this.state.description}
          placeholder="Enter Description..."
          onChange={this.handleChange}
          error=""
        />
        <div className="create-listing-page__buttons">
          <div className="create-listing-page__button-cancel">
            <ButtonSecondary label="Cancel" handleClick={this.handleCancel} />
          </div>
          <div className="create-listing-page__button-create">
            <ButtonPrimary label="Create" handleClick={this.handleCreateListing} />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateListingsPage;
