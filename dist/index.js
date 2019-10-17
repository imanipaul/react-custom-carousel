import React from "react";
import "./styles.css";

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.incrementSlide = this.incrementSlide.bind(this); // this.nextSlide = this.nextSlide.bind(this);

    this.incrementValue = this.incrementValue.bind(this);
    this.setSlide = this.setSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.setDot = this.setDot.bind(this);
    this.state = {
      slides: [1, 2, 3],
      currentSlide: 0,
      counterInterval: 0,
      slideInterval: 0
    };
  }

  incrementValue() {
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide + 1) % this.state.slides.length
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

  nextSlide(index) {
    clearInterval(this.state.counterInterval);
    clearInterval(this.state.slideInterval);
    this.setState({
      currentSlide: index
    });
    this.setSlide(index);
    this.setDot(index);
  }

  setSlide(val) {
    let slides = document.querySelectorAll(".carousel-slides");
    slides.forEach(function (slide) {
      return slide.classList.remove("showing");
    });
    slides[val - 1].classList.add("showing");
  }

  setDot(val) {
    let dots = document.querySelectorAll(".dot");
    dots.forEach(function (dot) {
      return dot.classList.remove("current-dot");
    });
    console.log("dots: ", dots);
    console.log("dots val: ", dots[val - 1]);
    dots[val - 1].classList.add("current-dot");
  }

  componentDidMount() {
    this.setState({
      counterInterval: setInterval(this.incrementValue, 3000),
      slideInterval: setInterval(this.incrementSlide, 3000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.counterInterval);
    clearInterval(this.state.slideInterval);
  }

  render() {
    return React.createElement("div", {
      className: "custom-carousel"
    }, React.createElement("div", {
      className: "carousel-container",
      style: {
        width: this.props.width,
        height: this.props.height
      }
    }, React.createElement("div", {
      className: "carousel-slides showing"
    }, this.props.img1 ? React.createElement("img", {
      className: "carousel",
      src: this.props.img1,
      alt: ""
    }) : React.createElement("video", {
      autoplay: true,
      muted: true,
      loop: true,
      controlsList: "nodownload"
    }, React.createElement("source", {
      src: this.props.vid1,
      type: "video/mp4"
    }))), React.createElement("div", {
      className: "carousel-slides"
    }, this.props.img2 ? React.createElement("img", {
      className: "carousel",
      src: this.props.img2,
      alt: ""
    }) : React.createElement("video", {
      controlsList: "nodownload",
      autoPlay: true,
      muted: true,
      loop: true
    }, React.createElement("source", {
      src: this.props.vid2,
      type: "video/mp4"
    }))), React.createElement("div", {
      className: "carousel-slides"
    }, this.props.img3 ? React.createElement("img", {
      className: "carousel",
      src: this.props.img3,
      alt: ""
    }) : React.createElement("video", {
      autoplay: true,
      muted: true,
      loop: true,
      controlsList: "nodownload"
    }, React.createElement("source", {
      src: this.props.vid3,
      type: "video/mp4"
    })))), this.props.dots && React.createElement("div", {
      className: "carousel-dots"
    }, this.state.slides.map(val => {
      if (val === 1) {
        return React.createElement("div", {
          key: val,
          id: `dot${val}`,
          className: "dot current-dot",
          onClick: () => this.nextSlide(val)
        });
      }

      return React.createElement("div", {
        onClick: () => this.nextSlide(val),
        key: val,
        id: `dot${val}`,
        className: "dot"
      });
    })));
  }

}

export default CustomCarousel;