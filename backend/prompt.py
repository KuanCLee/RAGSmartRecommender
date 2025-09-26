from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    product_id: int
    name: str
    relevance_score: float
    description: str
    reason: str

class RAGPydanticModel(BaseModel):
    products: List[Product]

class RAGInstructionsGenerator:
    def output_parser(self):
        return PydanticOutputParser(pydantic_object=RAGPydanticModel)

    def get_prompt_template(self):
        parser = self.output_parser()
        format_instructions = parser.get_format_instructions()

        claude_template = """
            <role>
                You are an AI assistant tasked with identifying products relevant to customer inquiries. You will receive a customer enquiry along with relevant context to assist you.
            </role>

            <task>
                - Please identify the 3 most relevant products that match the customer's requirements.
            </task>

            <guidelines>
                - Ensure all products are directly relevant to the enquiry and derived solely from the provided context.
            </guidelines>

            <input>
                <enquiry>
                    {enquiry}
                </enquiry>
                <context>
                    {context}
                </context>
            </input>

            <output_format>
                {format_instructions}
            </output_format>

            <output_guidance>
                - Strictly follow the output format instructions without adding any extra text or XML tags before or after.
                - Double-check that your output is valid JSON before finishing.
                - Do not include headers or code block indicators such as ```json```.
                - The "product_id" field must be an integer. Do not return it as a string.
                - The "relevance_score" field should be a float between 0 and 1.
            </output_guidance>
            """

        prompt_template = PromptTemplate(
            input_variables=["enquiry", "context", "format_instructions"],
            template=claude_template
        )

        # Return the filled prompt
        return prompt_template.partial(format_instructions=format_instructions)
