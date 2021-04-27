import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/global.scss";
import NavBar from "./components/molecules/NavBar/NavBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <h1>ROUTER</h1>
        </Router>
      </div>
    );
  }
}

export default App;
