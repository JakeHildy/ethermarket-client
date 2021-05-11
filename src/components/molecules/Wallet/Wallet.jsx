import React, { Component } from 'react';
import IconWallet from './../../atoms/IconWallet/IconWallet';
import InputField from './../../atoms/InputField/InputField';
import { toast } from 'react-toastify';
import './Wallet.scss';
import Web3 from 'web3';
import { getNetwork } from './../../../utils/cryptoHelpers';
import ButtonPrimary from './../../atoms/ButtonPrimary/ButtonPrimary';
import EthLogo from './../../../assets/icons/eth-logo.png';

export class Wallet extends Component {
  state = { netId: null, account: null, balance: '0', web3: null, sendAmount: '', sendToAddress: '', sending: false };

  sendCrypto = async (e) => {
    e.preventDefault();
    const { account, sendAmount, sendToAddress, web3, netId } = this.state;
    console.log('account', account);
    console.log('sendAmount', sendAmount);
    console.log('sendToAddress', sendToAddress);
    web3.eth
      .sendTransaction({ from: account, to: sendToAddress, value: Web3.utils.toWei(sendAmount), chainId: netId })
      .once('sending', (payload) => {
        console.log('sending: ', payload);
      })
      .once('sent', (payload) => {
        console.log('sent: ', payload);
      })
      .once('transactionHash', (hash) => {
        console.log('hash: ', hash);
        this.setState({ sending: true });
      })
      .once('receipt', (receipt) => console.log('receipt: ', receipt))
      .on('confirmation', (confNumber, receipt, latestBlockHash) => {
        // console.log('confNumber: ', confNumber);
        // console.log('receipt: ', receipt);
        // console.log('latestBlockHash: ', latestBlockHash);
        this.connectWallet();
      })
      .on('error', (error) => toast.success('Error Sending Ether'))
      .then((receipt) => {
        this.setState({ sending: false });
        toast.success('Ether Sent!');
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
    // Ethereum constants
    const { netId, account, balance, sendAmount, sendToAddress, sending } = this.state;
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
        {sending && (
          <div className="wallet__sending-cover">
            <img className="wallet__sending-cover--logo" src={EthLogo} alt="Sending" />
            <h3 className="wallet__sending-cover--text">Sending Ether...</h3>
          </div>
        )}
      </div>
    );
  }
}

export default Wallet;
