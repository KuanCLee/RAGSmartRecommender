import os
from dotenv import load_dotenv
from backend.agent.build_vectorstore import RAGIndexer
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Explicitly load the .env here (in RAG folder)
load_dotenv(dotenv_path="Kuan.env")

openai_api_key = os.getenv("OPENAI_API_KEY")
print("Loaded OPENAI_API_KEY:", openai_api_key is not None)

# Pass the key explicitly to RAGIndexer
indexer = RAGIndexer(
    collection_base_name="amazon_sales",
    persist_dir="./vector_database",
    batch_size=5,
    openai_api_key=openai_api_key  # pass here
)

# Build vectorstore if needed
#indexer.build_vectorstore()

# Query vectorstore (Need to desgin a pipeline to feed both query and database to a prompt)
query = "What is the fastest USB drive available within 300 dollars?"

indexer.query_vectorstore(query=query, collection_name="amazon_sales", top_k=5)
