import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ProductCard from "../components/ProductCard";
import RAGQueryUI from "../components/RAG_Query_UI";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false); // chat box toggle
  const [responses, setResponses] = useState([]);  // store chat context globally

  useEffect(() => {
    Papa.parse("/static/product_data/products.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const formatted = results.data.map((p) => ({
          ...p,
          discounted_price: Number(p.discounted_price) || 0,
          actual_price: Number(p.actual_price) || 0,
          discount_percentage: p.discount_percentage
            ? Number(p.discount_percentage.replace("%", ""))
            : 0,
          rating: Number(p.rating) || 0,
          about_product: p.about_product || "No description available",
        }));
        setProducts(formatted);
      },
    });
  }, []);

  return (
    <div style={{ position: "relative", backgroundColor: "#f9f9efff" }}>
      {/* Banner */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          aspectRatio: "1000/400",
          backgroundImage: "url('/static/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "4rem",
            fontWeight: "700",
            color: "#fff",
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            lineHeight: "1.2",
          }}
        >
          Your View <br /> Your Style
        </h1>
      </div>

      {/* Shop content */}
      <div style={{ paddingTop: "260px", padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} index={idx} />
          ))}
        </div>
      </div>

      {/* Floating Chat Box */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: chatOpen ? "350px" : "60px",
          height: chatOpen ? "400px" : "60px",
          transition: "all 0.3s",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "12px",
          overflow: "hidden",
          zIndex: 999,
          backgroundColor: "#fff",
        }}
      >
        {chatOpen ? (
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Chat header */}
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

            {/* Chat content */}
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
    </div>
  );
};

export default Shop;
