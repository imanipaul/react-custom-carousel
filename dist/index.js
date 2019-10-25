import React from "react";
import "./styles.css";

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.incrementSlide = this.incrementSlide.bind(this);
    this.incrementValue = this.incrementValue.bind(this);
    this.setSlide = this.setSlide.bind(this);
    this.changeSlide = this.changeSlide.bind(this);
    this.setDot = this.setDot.bind(this);
    this.getFileTypes = this.getFileTypes.bind(this);
    this.renderSlides = this.renderSlides.bind(this);
    this.renderDots = this.renderDots.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.state = {
      slides: [1, 2, 3],
      currentSlide: 0,
      counterInterval: 0,
      slideInterval: 0
    };
  }

  incrementValue() {
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide + 1) % this.props.assets.length
    }));
  }

  incrementSlide() {
    let slides = document.querySelectorAll(".carousel-slides");
    let dots = document.querySelectorAll(".dot");
    let value = this.state.currentSlide;
    slides.forEach(function (slide, index) {
      if (index === value) {
        return slide.classList.toggle("showing");
      } else {
        return slide.classList.remove("showing");
      }
    });
    dots.forEach(function (dot, index) {
      if (index === value) {
        return dot.classList.toggle("current-dot");
      } else {
        return dot.classList.remove("current-dot");
      }
    });
  }

  changeSlide(event) {
    clearInterval(this.state.counterInterval);
    clearInterval(this.state.slideInterval);
    this.setState({
      currentSlide: parseInt(event.target.getAttribute("value"))
    });
    this.setSlide(event.target.getAttribute("value"));
    this.setDot(event.target.getAttribute("value"));
  }

  setSlide(val) {
    let slides = document.querySelectorAll(".carousel-slides");
    slides.forEach(function (slide) {
      return slide.classList.remove("showing");
    });
    slides[val].classList.add("showing");
  }

  nextSlide() {
    clearInterval(this.state.counterInterval);
    clearInterval(this.state.slideInterval);
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide + 1) % this.props.assets.length
    }));
    this.setSlide((this.state.currentSlide + 1) % this.props.assets.length);
    this.setDot((this.state.currentSlide + 1) % this.props.assets.length);
  }

  setDot(val) {
    let dots = document.querySelectorAll(".dot");
    dots.forEach(function (dot) {
      return dot.classList.remove("current-dot");
    });
    dots[val].classList.add("current-dot");
  }

  getFileTypes() {
    let fileTypes = this.props.assets.map(function (asset) {
      let extension = asset.slice((Math.max(0, asset.lastIndexOf(".")) || Infinity) + 1);
      let fileInfo = {};

      if (extension === "mov" || extension === "mp4") {
        fileInfo["type"] = "video";
        fileInfo["asset"] = asset;
        return fileInfo;
      } else {
        fileInfo["type"] = "image";
        fileInfo["asset"] = asset;
        return fileInfo;
      }
    });
    return fileTypes;
  }

  renderSlides() {
    return this.state.files.map((file, index) => {
      if (file["type"] === "video") {
        return React.createElement("div", {
          key: index,
          className: index === 0 ? "carousel-slides showing" : "carousel-slides"
        }, React.createElement("video", {
          muted: true,
          loop: true,
          controlsList: "nodownload",
          autoPlay: true,
          controls: this.props.controls,
          playsInline: true
        }, React.createElement("source", {
          src: file["asset"],
          type: "video/mp4"
        })));
      } else {
        return React.createElement("div", {
          key: index,
          className: index === 0 ? "carousel-slides showing" : "carousel-slides"
        }, React.createElement("img", {
          className: "carousel",
          src: file["asset"],
          alt: ""
        }));
      }
    });
  }

  renderDots() {
    return React.createElement("div", {
      className: "carousel-dots"
    }, this.props.assets.map((val, i) => {
      return React.createElement("div", {
        key: i,
        value: i,
        id: `dot${i}`,
        className: i === 0 ? "dot current-dot" : "dot",
        onClick: e => this.changeSlide(e)
      });
    }));
  }

  renderCaptions() {
    return React.createElement("div", {
      className: "carousel-caption",
      style: this.props.captionStyles
    }, React.createElement("div", null, this.props.captions[this.state.currentSlide]));
  }

  componentDidMount() {
    this.setState({
      counterInterval: setInterval(this.incrementValue, this.props.duration),
      slideInterval: setInterval(this.incrementSlide, this.props.duration),
      files: this.getFileTypes()
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.counterInterval);
    clearInterval(this.state.slideInterval);
  }

  render() {
    return React.createElement("div", {
      className: "custom-carousel-container"
    }, this.props.arrows && React.createElement("img", {
      alt: "Left Arrow",
      onClick: this.nextSlide,
      className: "left-arrow",
      src: this.props.arrows[0]
    }), React.createElement("div", {
      className: "custom-carousel"
    }, React.createElement("div", {
      className: "carousel-container",
      style: {
        width: this.props.width,
        height: this.props.height
      }
    }, this.state.files && this.renderSlides()), this.props.captions && this.renderCaptions(), this.props.dots && this.renderDots()), this.props.arrows && React.createElement("img", {
      onClick: this.nextSlide,
      className: "right-arrow",
      src: this.props.arrows[1],
      alt: "Right Arrow"
    }));
  }

}

export default CustomCarousel;