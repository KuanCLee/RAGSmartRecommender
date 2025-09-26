import React from "react";

export default function Checkout({ cart }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "sans-serif",
        backgroundImage: "url('/checkout.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        position: "relative",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
        }}
      >
        Checkout
      </h1>

      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "flex-start",
        }}
      >
        {/* Products Section - left side */}
        <div style={{ minWidth: "300px" }}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.product_id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "20px",
                  fontSize: "18px",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={`/product_image/image_product_${item.product_id}.png`}
                  alt={item.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ margin: 0, fontWeight: "bold", fontSize: "20px" }}>{item.name}</p>
                  <p style={{ margin: "5px 0 0 0", fontSize: "18px" }}>
                    ${parseFloat(item.discounted_price).toFixed(2)}
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "bold" }}>
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Payment Section - horizontally centered */}
      <div
        style={{
          width: "400px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "200px", // adjust vertical position as needed
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
            textAlign: "center",
          }}
        >
          Payment & Address
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #fff",
            background: "transparent",
            color: "#fff",
          }}
        />
        <input
          type="text"
          placeholder="Address"
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #fff",
            background: "transparent",
            color: "#fff",
          }}
        />
        <input
          type="text"
          placeholder="Card Number"
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #fff",
            background: "transparent",
            color: "#fff",
          }}
        />
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Expiry Date"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #fff",
              background: "transparent",
              color: "#fff",
            }}
          />
          <input
            type="text"
            placeholder="CVV"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #fff",
              background: "transparent",
              color: "#fff",
            }}
          />
        </div>

        <button
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#047857",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
