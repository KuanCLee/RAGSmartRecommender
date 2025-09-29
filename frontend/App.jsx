import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import FloatingCart from "./components/FloatingCart";
import landingVideo from "/landingVideo.mp4";
import speakerOn from "/speaker-on.png";
import speakerOff from "/speaker-off.png";
import RAGQueryUI from "./components/RAG_Query_UI";

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

  // Only show video on Shop pages
  if (location.pathname !== "/" && location.pathname !== "/shop") return null;

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
          top: "50px",
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
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [responses, setResponses] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((p) => p.product_id === product.product_id);
    if (exists) {
      setCart(cart.map((p) =>
        p.product_id === product.product_id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (product_id, delta) => {
    setCart(prevCart =>
      prevCart
        .map(p =>
          p.product_id === product_id
            ? { ...p, quantity: p.quantity + delta }
            : p
        )
        .filter(p => p.quantity > 0) // remove items with quantity 0
    );
  };

  return (
    <Router>
      {/* Video Banner */}
      <VideoBanner />

      {/* NAV */}
      <div style={{
            position: "absolute", 
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "transparent", 
            gap: "20px",
            zIndex: 1000,
            }}>
        <Link to="/shop" style={{ fontWeight: "bold" } }>Shop</Link>
      </div>

      {/* Floating Cart */}
      <FloatingCart
        cart={cart}
        updateQuantity={updateQuantity}
        onClose={() => setCartOpen(false)}
        cartOpen={cartOpen}
        toggleCart={() => setCartOpen(!cartOpen)}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Shop addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
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
