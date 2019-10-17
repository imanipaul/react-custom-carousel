import React from "react";
import "./styles.css";
// import yarn from "./yarn.png";
// import lambs from "./lambs.png";
// import sheep from "./sheep-herd.png";

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.incrementSlide = this.incrementSlide.bind(this);
    // this.nextSlide = this.nextSlide.bind(this);
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

    // const counterInterval = 0;
    // const slideInterval = 0;
  }

  incrementValue() {
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide + 1) % this.state.slides.length
    }));
    console.log(this.state.currentSlide);
  }

  incrementSlide() {
    let slides = document.querySelectorAll(".carousel-slides");
    let dots = document.querySelectorAll(".dot");
    let value = this.state.currentSlide;
    slides.forEach(function(slide, index) {
      if (index === value) {
        return slide.classList.toggle("showing");
      } else {
        return slide.classList.remove("showing");
      }
    });

    dots.forEach(function(dot, index) {
      if (index === value) {
        return dot.classList.toggle("current-dot");
      } else {
        return dot.classList.remove("current-dot");
      }
    });
  }

  incrementDot() {
    let dots = document.querySelectorAll(".dots");
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
    slides.forEach(function(slide) {
      return slide.classList.remove("showing");
    });
    slides[val - 1].classList.add("showing");
  }

  setDot(val) {
    let dots = document.querySelectorAll(".dot");
    dots.forEach(function(dot) {
      return dot.classList.remove("current-dot");
    });
    console.log("dots: ", dots);
    console.log("dots val: ", dots[val - 1]);
    dots[val - 1].classList.add("current-dot");
  }

  componentDidMount() {
    this.state.counterInterval = setInterval(this.incrementValue, 3000);
    this.state.slideInterval = setInterval(this.incrementSlide, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.state.counterInterval);
    clearInterval(this.state.slideInterval);
  }

  render() {
    return (
      <div className="custom-carousel">
        <div
          className="carousel-container"
          style={{ width: this.props.width, height: this.props.height }}
        >
          <div className="carousel-slides showing">
            <img className="carousel" src={this.props.img1} alt="" />
          </div>
          <div className="carousel-slides">
            {/* <video autoplay muted loop controlsList="nodownload">
              <source src="videos/carousel-hulu_cutdown.mp4" type="video/mp4" />
            </video> */}
            <img className="carousel" src={this.props.img2} alt="" />
          </div>
          <div className="carousel-slides">
            <img className="carousel" src={this.props.img3} alt="" />
          </div>
        </div>
        {this.props.dots && (
          <div className="carousel-dots">
            {this.state.slides.map(val => {
              if (val === 1) {
                return (
                  <div
                    key={val}
                    id={`dot${val}`}
                    className="dot current-dot"
                    onClick={() => this.nextSlide(val)}
                  ></div>
                );
              }
              return (
                <div
                  onClick={() => this.nextSlide(val)}
                  key={val}
                  id={`dot${val}`}
                  className="dot"
                ></div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default CustomCarousel;
