from pydantic import BaseModel
from typing import List

#request
class QueryRequest(BaseModel):
    query:str

#response
class Product(BaseModel):
    product_id: int
    name: str
    relevance_score: float
    description: str
    reason: str

class RAGPydanticModel(BaseModel):
    products: List[Product]
