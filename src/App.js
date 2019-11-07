import React from "react";
// import CustomCarousel from "./Component/index";
import CustomCarousel from "./Component/index-edit";
import lambs from "./lambs.png";
import sheep from "./sheep-herd.png";
import yarn from "./yarn.png";
import leftArrow from "./left-arrow.png";
import rightArrow from "./right-arrow.png";
import loopvid from "./loop-cutdown.mp4";
let src1 = "https://picsum.photos/200/300";
let src2 = "https://picsum.photos/200/300";
let src3 = "https://picsum.photos/200/300";

// import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <CustomCarousel
        width={940}
        height={525}
        dots={true}
        assets={[lambs, loopvid, yarn, sheep, yarn, sheep]}
        duration={3000}
        arrows={[leftArrow, rightArrow]}
        captions={["slide1", "slide2", "slide3", "slide4", "slide5", "slide6"]}
        controls={false}
      /> */}
      <CustomCarousel assets={[lambs, sheep, yarn]} />
    </div>
  );
}

export default App;
