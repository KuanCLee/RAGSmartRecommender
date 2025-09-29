import os
import pandas as pd
from dotenv import load_dotenv
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import Document
import time
import gc

class RAGIndexer:
    def __init__(
        self,
        collection_base_name="glasses_sales",
        persist_dir="RAG/vector_database",
        batch_size=50,
        df: pd.DataFrame = None,
        openai_api_key: str = None,
    ):
        # Use passed key or fallback to env loading (optional)
        if openai_api_key:
            self.api_key = openai_api_key

        else:
            # Determine project root dynamically
            script_dir = os.path.dirname(os.path.abspath(__file__))  # backend/agent
            project_root = os.path.dirname(os.path.dirname(script_dir))  # RAGSmartRecommender
            dotenv_path = os.path.join(project_root, "Kuan.env")
            load_dotenv(dotenv_path=dotenv_path)
            self.api_key = os.getenv("OPENAI_API_KEY")

        if not self.api_key:
            raise ValueError("OPENAI_API_KEY is required!")

        self.embedding_model = OpenAIEmbeddings(openai_api_key=self.api_key)
        self.persist_dir = persist_dir
        self.collection_base_name = collection_base_name
        self.batch_size = batch_size
        self.user_df = df
        os.makedirs(self.persist_dir, exist_ok=True)
        
    def _chunk_list(self, lst, n):
        for i in range(0, len(lst), n):
            yield lst[i : i + n]

    def _load_documents(self):
        if self.user_df is not None:
            print("Using user-provided DataFrame.")
            df = self.user_df
        else:
            # Use your local CSV instead of Kaggle
            csv_path = "./frontend/static/product_data/products.csv"
            if not os.path.exists(csv_path):
                raise FileNotFoundError(f"{csv_path} not found!")
            print(f"Loading local CSV: {csv_path}")
            df = pd.read_csv(csv_path, sep=',', on_bad_lines='skip')

        df_json = df.to_dict(orient="records")
        documents = [
            Document(
                page_content="; ".join([f"{k}: {str(v)}" for k, v in record.items()]),
                metadata=record,
            )
            for record in df_json
        ]
        return documents

    def build_vectorstore(self):
        documents = self._load_documents()

        # Initialize one persistent vectorstore
        vectorstore = Chroma(
            collection_name=self.collection_base_name,
            embedding_function=self.embedding_model,
            persist_directory=self.persist_dir,
        )

        for batch_idx, batch_docs in enumerate(self._chunk_list(documents, self.batch_size)):
            print(f"Processing batch {batch_idx+1} with {len(batch_docs)} docs")

            vectorstore.add_documents(batch_docs)
            vectorstore.persist()

            del batch_docs
            gc.collect()
            time.sleep(1)  # small pause for safety
            print(f"Added and persisted batch {batch_idx+1}")

        print("All batches added to a single collection!")


    def query_vectorstore(self, query, collection_name="glasses_sales", top_k=3):
        retriever = Chroma(
            collection_name=collection_name,
            embedding_function=self.embedding_model,
            persist_directory=self.persist_dir,
        ).as_retriever(search_kwargs={"k": top_k})

        results = retriever.get_relevant_documents(query)
        for i, doc in enumerate(results):
            print(f"\n--- Document {i + 1} ---\n{doc.page_content[:300]}...")
        
        return results

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Build vector store from CSV")
    parser.add_argument(
        "--csv",
        type=str,
        default = "./frontend/static/product_data/products.csv",
        help="Path to the CSV file to load",
    )
    parser.add_argument(
        "--collection",
        type=str,
        default="glasses_sales",
        help="Vector store collection name",
    )
    parser.add_argument(
        "--batch_size",
        type=int,
        default=100,
        help="Batch size for vector insertion",
    )

    args = parser.parse_args()

    indexer = RAGIndexer(
        collection_base_name=args.collection,
        batch_size=args.batch_size,
        df=pd.read_csv(args.csv, sep=",", on_bad_lines='skip')
    )

    indexer.build_vectorstore()
