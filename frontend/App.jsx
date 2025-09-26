import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import RAGQueryUI from "./components/RAG_Query_UI";
import landingVideo from "./static/landingVideo.mp4";
import speakerOn from "./static/speaker-on.png";
import speakerOff from "./static/speaker-off.png";

function VideoBanner() {
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

  if (location.pathname.startsWith("/product/")) return null;

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        src={landingVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100vw", height: "auto", display: "block" }}
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

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [responses, setResponses] = useState([]);

  return (
    <Router>
      <nav style={{ padding: "10px", background: "white", zIndex: 10, position: "relative" }}>
        <Link to="/shop">Shop</Link>
      </nav>

      <VideoBanner />

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      {/* Persistent RAG Chat Box */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: chatOpen ? "350px" : "250px",
          height: chatOpen ? "400px" : "50px",
          transition: "all 0.3s",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "12px",
          overflow: "hidden",
          zIndex: 9999,
          backgroundColor: "#fff",
        }}
      >
        {chatOpen ? (
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                backgroundColor: "#047857",
                color: "#fff",
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={() => setChatOpen(false)}
            >
              Product Assistant
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <RAGQueryUI responses={responses} setResponses={setResponses} />
            </div>
          </div>
        ) : (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              width: "250px",
              minWidth: "250px",
              height: "50px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#047857",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
              borderRadius: "12px",
              lineHeight: "1.2",
              whiteSpace: "normal",
              zIndex: 9999,
            }}
            onClick={() => setChatOpen(true)}
          >
            Need help finding a product? Ask me!
          </div>
        )}
      </div>
    </Router>
  );
}
