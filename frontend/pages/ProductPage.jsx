import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";

export default function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    Papa.parse("/product_data/products.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const p = results.data.find(
          (row) => parseInt(row.product_id) === parseInt(id)
        );
        setProduct(p);
      },
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        display: "flex",
        gap: "40px",
        padding: "0 20px",
      }}
    >
      {/* Product Image */}
      <div style={{ flex: 1 }}>
        <img
          src={`/product_image/image_product_${product.product_id}.png`}
          alt={product.name}
          style={{ width: "100%", borderRadius: "12px", objectFit: "contain" }}
        />
      </div>

      {/* Product Details */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{product.name}</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>{product.brand}</p>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#047857" }}>
          ${parseFloat(product.discounted_price).toFixed(2)}{" "}
          <span style={{ textDecoration: "line-through", color: "#999", fontWeight: "normal" }}>
            ${parseFloat(product.actual_price).toFixed(2)}
          </span>
        </p>
        <p style={{ color: "#f59e0b", fontWeight: "bold" }}>
          Discount: {product.discount_percentage}
        </p>
        <p style={{ fontSize: "1rem", color: "#333" }}>{product.about_product}</p>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <label htmlFor="size" style={{ fontWeight: "bold" }}>Size:</label>
          <select id="size" style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #ccc" }}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>

        <button
          onClick={() => addToCart(product)}
          style={{
            backgroundColor: "#047857",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "20px",
            width: "fit-content",
          }}
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}
