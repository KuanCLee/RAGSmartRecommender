import React from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingCart({ cart, updateQuantity }) {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = React.useState(false);

  const goToCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      {/* Floating Cart Icon */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          cursor: "pointer",
          backgroundColor: "#047857",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "20px",
          fontWeight: "600",
          zIndex: 9999,
        }}
        onClick={() => setCartOpen(!cartOpen)}
      >
        🛒 {cart.reduce((sum, p) => sum + p.quantity, 0)}
      </div>

      {/* Cart Dropdown */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            right: "20px",
            width: "300px",
            maxHeight: "400px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            borderRadius: "12px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Items container */}
          <div
            style={{
              maxHeight: "calc(100% - 50px)",
              overflowY: "auto",
              padding: "10px",
            }}
          >
            {cart.length === 0 ? (
              <p style={{ textAlign: "center", color: "#555" }}>Cart is empty</p>
            ) : (
              cart.map((p) => (
                <div
                  key={p.product_id}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "12px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`/product_image/image_product_${p.product_id}.png`}
                    alt={p.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      borderRadius: "6px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: "bold" }}>{p.name}</p>
                    <p style={{ margin: 0, color: "#047857" }}>
                      ${parseFloat(p.discounted_price).toFixed(2)}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    <button onClick={() => updateQuantity(p.product_id, -1)}>-</button>
                    <span>{p.quantity}</span>
                    <button onClick={() => updateQuantity(p.product_id, 1)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout button */}
          {cart.length > 0 && (
            <button
              onClick={goToCheckout}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#047857",
                color: "#fff",
                border: "none",
                borderRadius: "0 0 12px 12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Checkout
            </button>
          )}
        </div>
      )}
    </>
  );
}
