import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, index }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const imagePath = `/product_image/image_product_${index + 1}.png`;

  // Render rating as stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push("★");
    if (halfStar) stars.push("☆");
    while (stars.length < 5) stars.push("☆");
    return stars.join(" ");
  };

  // Format discount without unnecessary decimal
  const formatDiscount = (discount) =>
    discount % 1 === 0 ? discount : discount.toFixed(1);

  return (
    <>
      {/* Product Card */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onClick={() => setShowModal(true)} // open modal
      >
        <div style={{ backgroundColor: "#fff", padding: "10px" }}>
          <img
            src={imagePath}
            alt={product.name}
            style={{ width: "100%", height: "150px", objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            backgroundColor: "#005b41ff",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontWeight: "bold", margin: "5px 0", color: "#fff" }}>
            {product.name}
          </h3>
          <p style={{ fontStyle: "italic", color: "#ccc", margin: "5px 0" }}>
            {product.brand}
          </p>
          <p
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              margin: "5px 0",
              color: "#fff",
            }}
          >
            ${product.discounted_price.toFixed(2)}
          </p>

          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent modal open
              navigate(`/product/${product.product_id}`); // navigate to product page
            }}
            style={{
              marginTop: "5px",
              padding: "5px 10px",
              fontSize: "0.8rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#7c2d12",
              color: "#fff",
            }}
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "500px",
              position: "relative",
              overflowY: "auto",
              maxHeight: "80vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "10px" }}>{product.name}</h2>
            <p style={{ fontStyle: "italic", color: "#666" }}>{product.brand}</p>
            <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              ${product.discounted_price.toFixed(2)}{" "}
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                  fontWeight: "normal",
                }}
              >
                ${product.actual_price.toFixed(2)}
              </span>
            </p>
            <p style={{ margin: "5px 0" }}>
              Discount: {formatDiscount(product.discount_percentage)}%
            </p>
            <p style={{ margin: "5px 0", color: "#f59e0b" }}>
              Rating: {renderStars(product.rating)} ({product.rating}/5)
            </p>
            <p style={{ marginTop: "10px" }}>{product.about_product}</p>

            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
