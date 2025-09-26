import os
import sys
# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)
import io
from dotenv import load_dotenv
import json
from backend.agent.build_vectorstore import RAGIndexer
from backend.agent.agentic_system import RAGPromptSystem 
from backend.agent.llm_loader import get_llm  
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv(dotenv_path="Kuan.env")
openai_api_key = os.getenv("OPENAI_API_KEY")
print("Loaded OPENAI_API_KEY:", openai_api_key is not None)

class QueryRequest(BaseModel):
    query:str
   
# Instantiate the vector indexer
indexer = RAGIndexer(
    collection_base_name="glasses_sales",
    persist_dir="./RAG/vector_database",
    batch_size=5,
    openai_api_key=openai_api_key
)
@app.post("/rag")
def run_rag(request: QueryRequest):
# Step 1: Define the query
    query = request.query

    # Step 2: Retrieve top documents as context
    retrieved_docs = indexer.query_vectorstore(query, collection_name="glasses_sales", top_k=5)

    # Combine documents into a single context string
    context = "\n\n".join([doc.page_content for doc in retrieved_docs])

    # Step 3: Instantiate and run the agent
    llm = get_llm(api_key=openai_api_key)  
    agent = RAGPromptSystem(llm)
    response = agent.run_rag_instructions_generator(enquiry=query, context=context)
    return response.dict()