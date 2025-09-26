import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RAGQueryUI({ responses, setResponses }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Immediately show user's input
    setResponses((prev) => [...prev, { query, answer: null }]);
    setLoading(true);

    try {
      const res = await fetch("https://ragsmartrecommender.onrender.com/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();

      // Update last entry with actual answer
      setResponses((prev) =>
        prev.map((r, i) =>
          i === prev.length - 1 ? { ...r, answer: data } : r
        )
      );
      setQuery("");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch RAG data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px", boxSizing: "border-box" }}>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
        {responses.map((r, idx) => (
          <div key={idx} style={{ marginBottom: "16px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "8px" }}>You: {r.query}</p>

            {r.answer ? (
              r.answer.products.map((product, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3 style={{ margin: "0 0 6px 0", fontWeight: "bold", color: "#047857" }}>
                    {product.name}
                  </h3>
                  <p style={{ margin: "0 0 4px 0", color: "#555" }}>
                    <strong>Relevance:</strong> {(product.relevance_score * 100).toFixed(0)}%
                  </p>
                  <p style={{ margin: "0 0 4px 0", color: "#333" }}>
                    <strong>Description:</strong> {product.description.split("|").join(". ")}
                  </p>
                  <p style={{ margin: "0", color: "#333" }}>
                    <strong>Reason:</strong> {product.reason}
                  </p>

                  {/* Link to ProductPage */}
                  <Link
                    to={`/product/${product.product_id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "6px 12px",
                      backgroundColor: "#047857",
                      color: "#fff",
                      borderRadius: "6px",
                      textDecoration: "none",
                    }}
                  >
                    View Details
                  </Link>
                </div>
              ))
              ) : loading ? (
              <p>Loading...</p>
            ) : null}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question..."
          style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#92400e",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
