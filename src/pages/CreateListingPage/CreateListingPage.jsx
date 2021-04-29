import React, { Component } from 'react';
import './CreateListingPage.scss';
import InputField from './../../components/atoms/InputField/InputField';

export class CreateListingsPage extends Component {
  state = {
    title: '',
    price: '',
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="create-listing-page">
        <h1 className="create-listing-page__title">Create Listing</h1>
        <InputField
          label="Title"
          value={this.state.title}
          placeholder="Enter Title..."
          onChange={this.handleChange}
          error=""
        />
        <InputField
          label="Price"
          value={this.state.price}
          placeholder="Enter Price..."
          onChange={this.handleChange}
          error=""
        />
      </div>
    );
  }
}

export default CreateListingsPage;
