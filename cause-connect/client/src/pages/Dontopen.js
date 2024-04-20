import React, { useState } from "react";
import img from "../../src/pages/cute_bee.jpeg";
import beeFlying from "../../src/pages/honey_bee_flying.mp4";

export default function Dontopen() {
  const [showVideo, setShowVideo] = useState(false);

  const handleClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="flex justify-center items-center">
      {!showVideo ? (
        <img
          src={img}
          alt="Placeholder"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <video width="500" controls autoPlay>
          <source src={beeFlying} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
