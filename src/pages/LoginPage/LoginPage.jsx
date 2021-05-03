import React, { Component } from 'react';
import './LoginPage.scss';
import axios from 'axios';
import EthereumLogo from './../../assets/images/ethereum-icon-purple.png';
import InputField from './../../components/atoms/InputField/InputField';
import ButtonPrimary from './../../components/atoms/ButtonPrimary/ButtonPrimary';

export class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    signup: false,
    email: '',
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  // Login
  handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_LOGIN_EP}`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.authToken = res.data.token;
          sessionStorage.userId = res.data.id;
          this.props.history.push('/home');
        }
      })
      .catch((err) => {
        console.log(`💣 === ERROR LOGGING IN === 💣`, err);
      });
  };

  // SignUp
  handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up Clicked');
    this.setState({ signup: true });
  };

  handleBack = (e) => {
    e.preventDefault();
    this.setState({ signup: false });
  };

  render() {
    const { signup } = this.state;
    return (
      <div className="login-page">
        <img className="login-page__logo" src={EthereumLogo} alt="logo" />
        <h1 className="login-page__title">EtherMarket</h1>
        <form className="login-page__login-form" onSubmit={this.handleLogin}>
          <div className="login-page__login-input">
            {signup && (
              <InputField
                name="email"
                label="Email"
                value={this.state.email}
                placeholder="Enter Email..."
                onChange={this.handleChange}
                error=""
              />
            )}

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
            {!signup && (
              <h4 onClick={this.handleSignUp} className="login-page__sign-up-text">
                Sign-up
              </h4>
            )}
            {signup && (
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                value={this.state.confirmPassword}
                placeholder="Re-enter Password..."
                onChange={this.handleChange}
                type="password"
                error=""
              />
            )}
            {signup && (
              <h4 onClick={this.handleBack} className="login-page__sign-up-text">
                Back
              </h4>
            )}
          </div>
          <div className="login-page__login-buttons">
            <ButtonPrimary label={signup ? 'Sign Up' : 'Login'} />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
