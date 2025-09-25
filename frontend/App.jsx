import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RAGQueryUI from "./components/RAG_Query_UI";
import Shop from "./pages/Shop";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: "10px" }}>
        <Link to="/shop">Shop</Link>
      </nav>

      <Routes>
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}
