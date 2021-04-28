import React, { Component } from 'react';
import './Gallery.scss';

export class Gallery extends Component {
  render() {
    const { images } = this.props.images;
    return (
      <div className="gallery">
        <figure className="gallery__figure">
          <img src={images[0].url} alt="Image 1" className="gallery__img" />
        </figure>
      </div>
    );
  }
}

export default Gallery;
