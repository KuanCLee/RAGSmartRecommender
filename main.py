import os
import sys
import io
from dotenv import load_dotenv

from backend.agent.build_vectorstore import RAGIndexer
from backend.agent.agentic_system import AgenticSystem 
from backend.llm_loader import get_llm  #TODO

# Ensure UTF-8 printing
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load environment variables
load_dotenv(dotenv_path="Kuan.env")
openai_api_key = os.getenv("OPENAI_API_KEY")
print("Loaded OPENAI_API_KEY:", openai_api_key is not None)

# Instantiate the vector indexer
indexer = RAGIndexer(
    collection_base_name="amazon_sales",
    persist_dir="./vector_database",
    batch_size=5,
    openai_api_key=openai_api_key
)

# Build vectorstore first time
#indexer.build_vectorstore()

# Step 1: Define the query
query = "What is the fastest USB drive available within 300 dollars?"

# Step 2: Retrieve top documents as context
top_k = 5
retriever = indexer.get_retriever(collection_name="amazon_sales", top_k=top_k) #TODO
retrieved_docs = retriever.get_relevant_documents(query) #TODO

# Combine documents into a single context string
context = "\n\n".join([doc.page_content for doc in retrieved_docs])

# Step 3: Instantiate and run the agent
llm = get_llm(openai_api_key=openai_api_key)  #TODO
agent = AgenticSystem(llm)

response = agent.run_rag_instructions_generator(enquiry=query, context=context)
