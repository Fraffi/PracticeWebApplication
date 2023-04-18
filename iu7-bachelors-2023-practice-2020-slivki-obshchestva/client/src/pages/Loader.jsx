import React, { Component } from 'react';
import '../static/css/loader.css';
import { Default } from 'react-spinners-css';

class Loader extends Component {
  render() {
    return (
      <div className="loader-body">
        <Default color="#fff" size={150} />
      </div>
    );
  }
}

export default Loader;
