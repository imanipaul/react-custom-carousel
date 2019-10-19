import React from "react";
import CustomCarousel from "./Component/index";
import lambs from "./lambs.png";
import sheep from "./sheep-herd.png";
import yarn from "./yarn.png";
import loopvid from "./loop-cutdown.mp4";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <CustomCarousel
        img1={lambs}
        // img2={yarn}
        vid2={loopvid}
        img3={sheep}
        width={940}
        height={525}
        dots={false}
        assets={[lambs, loopvid, yarn, sheep, yarn, sheep]}
        duration={3000}
      />
    </div>
  );
}

export default App;
