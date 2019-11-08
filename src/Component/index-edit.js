import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const CustomCarousel = props => {
  const [currentSlide, setCurrentSlide] = useState(0); //current displayed slide value
  const dotsRef = useRef(0);
  const slidesRef = useRef();
  const [isActive, setIsActive] = useState(true);

  const renderSlides = () => {
    return props.assets.map((asset, index) => {
      return (
        <div
          key={index}
          id={`slide${index}`}
          className={
            index === dotsRef.current
              ? "carousel-slides showing"
              : "carousel-slides"
          }
        >
          <img className="carousel" src={asset} alt="" />
        </div>
      );
    });
  };

  const renderDots = () => {
    return props.assets.map((element, index) => {
      return (
        <div
          ref={dotsRef}
          key={index}
          id={`dot${index}`}
          className={index === dotsRef.current ? "dot current-dot" : "dot"}
          onClick={() => {
            setIsActive(false);
            setCurrentSlide(index);
          }}
        ></div>
      );
    });
  };

  useEffect(() => {
    let interval = null;
    // if (isActive) {
    //   interval = setInterval(() => {
    //     // setCurrentSlide((currentSlide + 1) % 3);
    //     // currentSlideRef.current = (currentSlideRef.current + 1) % 3;
    //     // console.log(currentSlideRef.current);
    //     currentSlideRef.current.className =
    //       currentSlideRef.current.className === "dot"
    //         ? "dot current-dot"
    //         : "dot";
    //   }, 2000);
    //   // console.log(currentSlide);
    // } else if (!isActive) {
    //   clearInterval(interval);
    // }

    console.log("slidesRef is: ", slidesRef);
    console.log("dotsRef is: ", dotsRef);
    console.log("slidesRef children is: ", slidesRef.current.children);
    console.log("slidesRef child 1 is: ", slidesRef.current.children[0]);
    console.log(
      "slidesRef child 1 className is: ",
      slidesRef.current.children[0].className
    );

    slidesRef.current.children[0].classList.toggle("showing");
    slidesRef.current.children[1].classList.toggle("showing");
    console.log(
      "slidesRef child 0 className is: ",
      slidesRef.current.children[0].className
    );
    console.log(
      "slidesRef child 1 className is: ",
      slidesRef.current.children[1].className
    );
    // slidesRef.current.children.forEach(function(element) {
    //   console.log()
    // })
    return () => clearInterval(interval);
    // console.log(currentSlideRef);
    // console.log(currentSlideRef);
    // console.log(currentSlideRef.current.className);
  }, [isActive, currentSlide]);

  return (
    <div className="custom-carousel-container">
      {/* <button
        onClick={() => {
          currentSlideRef.current = (currentSlideRef.current + 1) % 3;
          console.log(currentSlideRef.current);
        }}
      >
        +
      </button>
      <div>Ref: {currentSlideRef.current}</div> */}
      {/* <section>{currentSlideRef.current}</section> */}
      <div className="custom-carousel" ref={slidesRef}>
        {renderSlides()}
      </div>
      {renderDots()}
    </div>
  );
};

export default React.memo(CustomCarousel);
