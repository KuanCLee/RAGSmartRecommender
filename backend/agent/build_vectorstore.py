import os
import pandas as pd
from dotenv import load_dotenv
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import Document
import kagglehub
import time
import gc

class RAGIndexer:
    def __init__(
        self,
        collection_base_name="collection",
        persist_dir="../../vector_database",
        batch_size=50,
        df: pd.DataFrame = None,
    ):
        load_dotenv(dotenv_path=os.path.join("..", "..", "Kuan.env"))
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.embedding_model = OpenAIEmbeddings()
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
            print("Using default Kaggle dataset.")
            dataset_dir = kagglehub.dataset_download("karkavelrajaj/amazon-sales-dataset")
            files = os.listdir(dataset_dir)
            print("Downloaded files:", files)
            csv_path = os.path.join(dataset_dir, files[0])
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


    def query_vectorstore(self, query, collection_name="my_combined_collection", top_k=5):
        retriever = Chroma(
            collection_name=collection_name,
            embedding_function=self.embedding_model,
            persist_directory=self.persist_dir,
        ).as_retriever(search_kwargs={"k": top_k})

        results = retriever.get_relevant_documents(query)
        for i, doc in enumerate(results):
            print(f"\n--- Document {i + 1} ---\n{doc.page_content[:300]}...")

if __name__ == "__main__":
    indexer = RAGIndexer(
        collection_base_name="amazon_sales",
        batch_size=100,  
        df=None  
    )
    
    indexer.build_vectorstore()
    