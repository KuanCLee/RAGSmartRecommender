import React, { useState } from "react";

export default function RAGQueryUI() {
  const[query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefauly();
    setLoading(true);
    setResponse(null);

    const res = await fetch("http://localhost:8000/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
  
    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">RAG Query UI</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded p-2 flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {response && (
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );

}

