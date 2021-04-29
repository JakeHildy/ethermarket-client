import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Link to="/create">Create Posting</Link>
        <Link to="/edit">Edit Posting</Link>
      </div>
    );
  }
}

export default HomePage;
