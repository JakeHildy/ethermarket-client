import React, { Component } from 'react';
import IconWallet from './../../atoms/IconWallet/IconWallet';
import InputField from './../../atoms/InputField/InputField';
import './Wallet.scss';
import Web3 from 'web3';
import { getNetwork } from './../../../utils/cryptoHelpers';
import ButtonPrimary from './../../atoms/ButtonPrimary/ButtonPrimary';

export class Wallet extends Component {
  state = { netId: null, account: null, balance: '0', web3: null, sendAmount: '', sendToAddress: '' };

  sendCrypto = async (e) => {
    e.preventDefault();
    const { account, sendAmount, sendToAddress, web3, netId } = this.state;
    console.log('account', account);
    console.log('sendAmount', sendAmount);
    console.log('sendToAddress', sendToAddress);
    web3.eth
      .sendTransaction({ from: account, to: sendToAddress, value: Web3.utils.toWei(sendAmount), chainId: netId })
      .once('sending', (payload) => console.log('sending: ', payload))
      .once('sent', (payload) => console.log('sent: ', payload))
      .once('transactionHash', (hash) => console.log('hash: ', hash))
      .then((receipt) => {
        console.log('receipt', receipt);
      });
  };

  componentDidMount() {
    this.connectWallet();
  }

  connectWallet = async () => {
    // check if MetaMask exists
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();

      //check if account is detected, then load balance & setStates.
      if (typeof accounts[0] !== 'undefined') {
        // load balance data
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({ account: accounts[0], netId, balance, web3 });
      } else {
        console.log('Please Install MetaMask');
      }
    } else {
      console.log('Please Install MetaMask');
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // Listing
    const { listing } = this.props;
    const { price, listCurrency } = listing;
    // Ethereum constants
    const { netId, account, balance, sendAmount, sendToAddress } = this.state;
    return (
      <div className="wallet">
        <div className="wallet__address-container">
          <div className="wallet__icon">
            <IconWallet />
          </div>
          <p className="wallet__address">{account}</p>
        </div>
        <p className="wallet__network">{`Network: ${getNetwork(netId)}`}</p>
        <p className="wallet__balance">{`${Web3.utils.fromWei(balance)} ETH`}</p>
        <form onSubmit={this.sendCrypto} className="wallet__form">
          <div className="wallet__form--amount">
            <InputField
              name="sendAmount"
              label="send"
              value={sendAmount}
              placeholder="Enter Amount..."
              onChange={this.handleChange}
              error=""
            />
            <p className="wallet__form--currency">ETH</p>
          </div>

          <InputField
            name="sendToAddress"
            label="to"
            value={sendToAddress}
            placeholder="Enter Adress..."
            onChange={this.handleChange}
            error=""
          />
          <div className="wallet__send-button">
            <ButtonPrimary label="Send" />
          </div>
        </form>
      </div>
    );
  }
}

export default Wallet;
