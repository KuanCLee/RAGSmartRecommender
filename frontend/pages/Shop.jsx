// Shop.jsx
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Papa.parse("/product_data/products.csv", {
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
      {/* Banner with original overlay format */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "2000/800",
          backgroundImage: "url('/banner.png')",
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

      {/* Product Grid */}
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
    </div>
  );
};

export default Shop;
