import React, { Component } from 'react';
import './ListingForm.scss';
import InputField from './../../atoms/InputField/InputField';
import TextArea from './../../atoms/TextArea/TextArea';
import DropDownField from './../../atoms/DropDownField/DropDownField';
import ButtonPrimary from './../../atoms/ButtonPrimary/ButtonPrimary';
import ButtonSecondary from './../../atoms/ButtonSecondary/ButtonSecondary';
import ButtonDanger from './../../atoms/ButtonDanger/ButtonDanger';

export class ListingForm extends Component {
  state = {
    title: '',
    price: '',
    listCurrency: 'ETH',
    category: 'Miscellaneous',
    condition: '',
    location: '',
    description: '',
    titleError: '',
    priceError: '',
    descriptionError: '',
  };

  componentDidMount() {
    const { title, price, listCurrency, category, condition, location, description } = this.props.listing;
    this.setState({ title, price, listCurrency, category, condition, location, description });
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  attemptSubmit = (e) => {
    e.preventDefault();
    const { handleSubmit } = this.props;

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
        const { title, price, listCurrency, category, condition, location, description } = this.state;
        const data = { title, price, listCurrency, category, condition, location, description };
        handleSubmit(data);
      }
    );
  };

  render() {
    const { handleCancel, handleDelete } = this.props;
    return (
      <div className="listing-form__container-bottom">
        <div className="listing-form__container-bottom-left">
          <InputField
            name="title"
            label="Title *"
            value={this.state.title}
            placeholder="Enter Title..."
            onChange={this.handleChange}
            error={this.state.titleError}
          />
          <div className="listing-form__currency-input">
            <div className="listing-form__amount">
              <InputField
                name="price"
                label="Price *"
                value={this.state.price}
                placeholder="Enter Price..."
                onChange={this.handleChange}
                error={this.state.priceError}
              />
            </div>
            <div className="listing-form__currency">
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
        <div className="listing-form__container-bottom-right">
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
          <div className="listing-form__buttons">
            <div className="listing-form__button-cancel">
              <ButtonSecondary label="Cancel" handleClick={handleCancel} />
            </div>
            {handleDelete && (
              <div className="listing-form__button-cancel">
                <ButtonDanger label="Delete" handleClick={handleDelete} />
              </div>
            )}
            <div className="listing-form__button-create">
              <ButtonPrimary label="Submit" handleClick={this.attemptSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListingForm;
