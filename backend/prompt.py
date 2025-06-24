from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate

class RAGInstructionsGenerator:
    def output_parser(self):
        return PydanticOutputParser(pydantic_object=YourPydanticModel)  #TODO

    def get_prompt_template(self):
        parser = self.output_parser()
        
        claude_template = """
        <role>
            You are an AI assistant tasked with identifying products relevant to customer inquiries. You will receive a customer enquiry along with relevant context to assist you.
        </role>

        <task>
            - Please identify the 5 most relevant products that match the customer's requirements.
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
            <feed>
                {feed}
            </feed>
        </input>

        <output_format>
            {format_instructions}
        </output_format>

        <output_guidance>
            - Strictly follow the output format instructions without adding any extra text or XML tags before or after.
            - Double-check that your output is valid JSON before finishing.
            - Do not include headers or code block indicators such as ```json```.
        </output_guidance>
        """

        prompt_template = PromptTemplate(
            input_variables=["enquiry", "context", "feed"],
            template=claude_template,
            partial_variables={
                "format_instructions": parser.get_format_instructions()
            }
        )
        return prompt_template
