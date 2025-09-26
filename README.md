# RAG Product Recommendation System

This repository showcases a prototype for a **Retrieval-Augmented Generation (RAG)** system that recommends products based on customer inquiries. It combines **semantic search** over product descriptions with **LLM-powered generation** to provide accurate and explainable recommendations.

To show it off, I built a small web demo selling glasses, letting customers quickly find their best fit just by asking questions.

---

![Demo of RAG Product Recommendation System](demo/Demo.gif)


## Technologies Used

- **Python** – for data processing and RAG logic
- **OpenAI** – embeddings and language generation
- **Chroma** – vector storage and semantic search
- **LangChain** – prompt templates, parsers, and chains
- **Pandas** – data preprocessing and transformation
- **Vite + React** – for building a fast, modern frontend
- 
---

## System Overview

The core idea of this system:

1. **Embed** product descriptions using OpenAI embeddings
2. **Store** the embeddings in a vector database (Chroma)
3. **Retrieve** relevant products based on semantic similarity to a user query
4. **Generate** natural language recommendations using an LLM with structured output (via Pydantic)

---

## Roadmap

- [x] Preprocess and embed product data
- [x] Build and query a vector database (Chroma)
- [x] Create a prompt template and output parser using Pydantic + LangChain
- [x] Develop a RAG agent to retrieve and recommend products based on context
- [x] Build an interactive frontend (Streamlit for quick prototyping or Vite + React for production)
- [x] Integrate the agent into the frontend
- [x] Deploy as a lightweight API or web app

---

