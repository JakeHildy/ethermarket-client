import React, { Component } from 'react';
import './LoginPage.scss';
import EthereumLogo from './../../assets/images/ethereum-icon-purple.png';
import InputField from './../../components/atoms/InputField/InputField';
import ButtonPrimary from './../../components/atoms/ButtonPrimary/ButtonPrimary';

export class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submitted');
  };

  render() {
    return (
      <div className="login-page">
        <img className="login-page__logo" src={EthereumLogo} alt="logo" />
        <h1 className="login-page__title">EtherMarket</h1>
        <form className="login-page__login-form" onSubmit={this.handleSubmit}>
          <div className="login-page__login-input">
            <InputField
              name="username"
              label="Username"
              value={this.state.username}
              placeholder="Enter Username..."
              onChange={this.handleChange}
              error=""
            />
            <InputField
              name="password"
              label="Password"
              value={this.state.password}
              placeholder="Enter Password..."
              onChange={this.handleChange}
              type="password"
              error=""
            />
          </div>
          <div className="login-page__login-buttons">
            <ButtonPrimary label="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
