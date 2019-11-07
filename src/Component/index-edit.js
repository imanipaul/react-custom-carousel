import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";

const CustomCarousel = props => {
  const [currentSlide, setCurrentSlide] = useState(0); //current displayed slide value
  const [isActive, setIsActive] = useState(true);

  const toggle = () => {
    setIsActive(!isActive);
  };

  // const displaySlide = () => {
  //   // return <div>{props.assets[currentSlide]}</div>;

  //   if (currentSlide === 0) {
  //     return <img src={props.assets[0]} />;
  //   } else if (currentSlide === 1) {
  //     return <img src={props.assets[1]} />;
  //   } else if (currentSlide === 2) {
  //     return <img src={props.assets[2]} />;
  //   }

  //   // return (
  //   //   // <img
  //   //   //   src={props.assets[currentSlide]}
  //   //   //   alt={`carousel slide ${currentSlide}`}
  //   //   // />
  //   // );
  // };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setCurrentSlide((currentSlide + 1) % 3);
      }, 3000);
      // console.log("isActive = ", isActive);
      console.log(currentSlide);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, currentSlide]);

  return (
    <div className="custom-carousel-container">
      <button onClick={toggle}>{isActive ? "Stop" : "Start"}</button>
      <div>
        <div>Current Slide is: {currentSlide}</div>
        <div>{`isActive: ${isActive}`}</div>
        {/* {renderSlides()} */}
        {/* <img
          className="appear"
          alt="carousel slide"
          // src={props.assets[currentSlide]}
          
        /> */}

        <div
          className="carousel-background"
          style={{
            border: "1px solid blue",
            height: "300px",
            width: "600px",
            background: `url(${props.assets[currentSlide]})`
          }}
        ></div>
      </div>
    </div>
  );
};

export default CustomCarousel;
