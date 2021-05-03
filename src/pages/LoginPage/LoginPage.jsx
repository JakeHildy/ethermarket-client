import React, { Component } from 'react';
import './LoginPage.scss';
import axios from 'axios';
import EthereumLogo from './../../assets/images/ethereum-icon-purple.png';
import InputField from './../../components/atoms/InputField/InputField';
import ButtonPrimary from './../../components/atoms/ButtonPrimary/ButtonPrimary';

const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class LoginPage extends Component {
  state = {
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    signup: false,
    email: '',
    emailError: '',
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  // Login
  handleLogin = (e) => {
    e.preventDefault();
    if (this.state.signup) {
      // Register / Signup

      // Validation
      let usernameError = '';
      if (!this.state.username) {
        usernameError = 'This field is required';
      }

      let emailError = '';
      if (!this.state.email) {
        emailError = 'This field is required';
      } else if (!emailValidation.test(this.state.email)) {
        emailError = 'Invalid email address';
      }

      let passwordError = '';
      if (!this.state.password) {
        passwordError = 'This field is required';
      } else if (this.state.password.length < 8) {
        passwordError = 'Password must be at least 8 characters long';
      }

      let confirmPasswordError = '';
      if (this.state.password !== this.state.confirmPassword) {
        confirmPasswordError = 'Passwords do not match';
      }

      this.setState({ confirmPasswordError, passwordError, emailError, usernameError }, () => {
        if (passwordError || confirmPasswordError || emailError || usernameError) return;
        axios
          .post(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_SIGNUP_EP}`, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
          })
          .then((res) => {
            if (res.status === 201) {
              console.log('Signup successful.');
              this.setState({ signup: false });
            }
          })
          .catch((err) => {
            console.log(`💣 === ERROR LOGGING IN === 💣`, err);
          });
      });
    } else {
      // Regular Login
      // Validation
      let usernameError = '';
      if (!this.state.username) {
        usernameError = 'This field is required';
      }

      let passwordError = '';
      if (!this.state.password) {
        passwordError = 'This field is required';
      }

      this.setState({ passwordError, usernameError }, () => {
        if (passwordError || usernameError) return;
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
      });
    }
  };

  // SignUp
  handleSignUp = (e) => {
    e.preventDefault();
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
                error={this.state.emailError}
              />
            )}

            <InputField
              name="username"
              label="Username"
              value={this.state.username}
              placeholder="Enter Username..."
              onChange={this.handleChange}
              error={this.state.usernameError}
            />
            <InputField
              name="password"
              label="Password"
              value={this.state.password}
              placeholder="Enter Password..."
              onChange={this.handleChange}
              type="password"
              error={this.state.passwordError}
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
                error={this.state.confirmPasswordError}
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
