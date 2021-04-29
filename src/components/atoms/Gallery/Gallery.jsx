import React, { Component } from 'react';
import BackArrow from './../../../assets/icons/arrow_back_ios_black_24dp.svg';
import NextArrow from './../../../assets/icons/arrow_forward_ios_black_24dp.svg';
import './Gallery.scss';

export class Gallery extends Component {
  state = {
    currentSlide: 0,
    maxSlides: this.props.images.length - 1,
  };

  backPressed = () => {
    let { currentSlide, maxSlides } = this.state;
    if (currentSlide <= 0) {
      this.setState({ currentSlide: this.state.maxSlides });
    } else {
      this.setState({ currentSlide: +this.state.currentSlide - 1 });
    }
  };
  nextPressed = () => {
    let { currentSlide, maxSlides } = this.state;
    if (currentSlide >= maxSlides) {
      this.setState({ currentSlide: 0 });
    } else {
      this.setState({ currentSlide: +currentSlide + 1 });
    }
  };

  onDotPressed = (e) => {
    this.setState({ currentSlide: +e.target.dataset.slide });
  };

  render() {
    const { images } = this.props;
    const slides = images;
    return (
      <div className="gallery">
        {/* <div className="gallery__slider"> */}
        {slides.map((slide, i) => {
          return (
            <div
              key={slide._id}
              className="gallery__slide"
              style={{ transform: `translateX(${100 * (i - this.state.currentSlide)}%)` }}
            >
              <img src={slide.url} alt="Gallery" className="gallery__img" />
            </div>
          );
        })}
        <img src={BackArrow} alt="Gallery Back Button" className="gallery__back-button" onClick={this.backPressed} />
        <img src={NextArrow} alt="Gallery Next Button" className="gallery__next-button" onClick={this.nextPressed} />
        <div className="gallery__dots">
          {slides.map((_, i) => {
            return (
              <button
                key={i}
                className={`gallery__dot ${i === this.state.currentSlide ? 'gallery__dot--current-dot' : ''}`}
                data-slide={i}
                onClick={this.onDotPressed}
              ></button>
            );
          })}
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default Gallery;
