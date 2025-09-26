import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Shop from "./pages/Shop";
import landingVideo from "./static/landingVideo.mp4";
import speakerOn from "./static/speaker-on.png";
import speakerOff from "./static/speaker-off.png";

export default function App() {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = soundOn; // flip muted
      setSoundOn(!soundOn);

      if (!soundOn) {
        // make sure sound actually plays
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <Router>
      <nav style={{ padding: "10px", position: "relative", zIndex: 10, background: "white" }}>
        <Link to="/shop">Shop</Link>
      </nav>

      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          src={landingVideo}
          autoPlay
          loop={true}
          muted
          playsInline
          style={{
            width: "100vw",
            height: "auto",
            display: "block",
          }}
        />

        {/* Speaker icon button on top-left */}
        <button
          onClick={toggleSound}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
            padding: 0,
          }}
        >
          <img
            src={soundOn ? speakerOn : speakerOff}
            alt={soundOn ? "Sound On" : "Muted"}
            style={{ width: "32px", height: "32px" }} // adjust size as needed
          />
        </button>

      </div>

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}
