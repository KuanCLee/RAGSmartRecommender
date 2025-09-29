import  { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import landingVideo from "/landingVideo.mp4";
import speakerOn from "/speaker-on.png";
import speakerOff from "/speaker-off.png";

export default function VideoBanner() {
  const location = useLocation();
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = soundOn;
      setSoundOn(!soundOn);
      if (!soundOn) videoRef.current.play().catch(() => {});
    }
  };

  // Only show video on Shop pages
  if (location.pathname !== "/" && location.pathname !== "/shop") return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src={landingVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
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
          style={{ width: "32px", height: "32px" }}
        />
      </button>
    </div>
  );
}
