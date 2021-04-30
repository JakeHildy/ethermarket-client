import React, { Component } from 'react';
import './CreateListingPage.scss';
import InputField from './../../components/atoms/InputField/InputField';
import TextArea from './../../components/atoms/TextArea/TextArea';
import DropDownField from './../../components/atoms/DropDownField/DropDownField';

export class CreateListingsPage extends Component {
  state = {
    title: '',
    price: '',
    listCurrency: 'ETH',
    category: 'Miscellaneous',
    condition: '',
    location: '',
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
      </div>
    );
  }
}

export default CreateListingsPage;
