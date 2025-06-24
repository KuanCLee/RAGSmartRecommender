from backend.prompt import RAGInstructionsGenerator

class AgenticSystem:
    def __init__(self, llm):
        self.llm = llm  # Assumes llm is passed in during initialization

    def run_rag_instructions_generator(self, enquiry: str, context: str):
        # Instantiate the prompt helper
        advisor_instance = RAGInstructionsGenerator()
        prompt = advisor_instance.get_prompt_template()

        # Format the prompt with user inputs
        filled_prompt = prompt.format(
            enquiry=enquiry,
            context=context
        )

        # Pipe it through the LLM and parse
        chain = filled_prompt | self.llm | advisor_instance.output_parser()
        return chain.invoke({})
