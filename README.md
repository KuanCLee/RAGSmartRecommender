> 🚧 **PROJECT IN PROGRESS**  
> This is a work-in-progress prototype!

# 🛒 RAG Product Recommendation System

This repository showcases a prototype for a **Retrieval-Augmented Generation (RAG)** system that recommends products based on customer inquiries. It combines **semantic search** over product descriptions with **LLM-powered generation** to provide relevant and explainable recommendations.

As a demonstration, we use publicly available product data from [Kaggle: Amazon Sales Dataset](https://www.kaggle.com/datasets/karkavelrajaj/amazon-sales-dataset?select=amazon.csv) to simulate real-world queries and recommendations.

---
![Demo GIF](demo/Demo.gif)

## 🔧 Technologies Used

- **Python**
- **OpenAI** (for embeddings and language generation)
- **Chroma** (for vector storage and retrieval)
- **LangChain** (for prompt templates, parsers, and chains)
- **Pandas** (for data preprocessing and transformation)
- *(Coming soon: Streamlit or React for UI)*

---

## 🧩 System Overview

The core idea of this system:

1. **Embed** product descriptions using OpenAI embeddings
2. **Store** the embeddings in a vector database (Chroma)
3. **Retrieve** relevant products based on semantic similarity to a user query
4. **Generate** natural language recommendations using an LLM with structured output (via Pydantic)

---

## 🚀 Roadmap

- [x] Preprocess and embed product data
- [x] Build and query a vector database (Chroma)
- [x] Create a prompt template and output parser using Pydantic + LangChain
- [x] Develop a RAG agent to retrieve and recommend products using context
- [ ] Build an interactive frontend (Streamlit for fast prototyping or React for production use)
- [ ] Add unit tests and CI pipeline
- [ ] Deploy as a lightweight API or app

---

