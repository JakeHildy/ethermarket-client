import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './styles/global.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/molecules/NavBar/NavBar';
import Footer from './components/molecules/Footer/Footer';
import Modal from './components/molecules/Modal/Modal';
import BrowsePage from './pages/BrowsePage/BrowsePage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import CreateListingPage from './pages/CreateListingPage/CreateListingPage';
import EditListingPage from './pages/EditListingPage/EditListingPage';
import ListingPage from './pages/ListingPage/ListingPage';
import ChatPage from './pages/ChatPage/ChatPage';
import CareersPage from './pages/CareersPage/CareersPage';
import AboutPage from './pages/AboutPage/AboutPage';
import InvestorsPage from './pages/InvestorsPage/InvestorsPage';

class App extends Component {
  state = { showModal: false, modalText: '', modalCB: null };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  showModal = (text, cb) => {
    this.setState({ showModal: true, modalText: text, modalCB: cb });
  };

  render() {
    const { showModal, modalText, modalCB } = this.state;
    return (
      <div className="App">
        <Router>
          <ToastContainer autoClose={2000} />
          <NavBar />
          <Switch>
            <Route path="/browse" component={BrowsePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/careers" component={CareersPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/investors" component={InvestorsPage} />
            <Route path="/create" component={CreateListingPage} />
            <Route
              path="/edit/:id"
              render={(routerProps) => <EditListingPage showModal={this.showModal} {...routerProps} />}
            />
            <Route path="/chat/:id" component={ChatPage} />
            <Route path="/listing/:id" component={ListingPage} />
            <Redirect from="/" to="/browse" />
          </Switch>
          <Footer />
          {showModal && <Modal hideModal={this.hideModal} text={modalText} cb={modalCB} />}
        </Router>
      </div>
    );
  }
}

export default App;
