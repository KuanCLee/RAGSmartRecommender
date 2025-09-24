from backend.prompt import RAGInstructionsGenerator

class RAGPromptSystem:
    def __init__(self, llm):
        self.llm = llm  # Assumes llm is passed in during initialization

    def run_rag_instructions_generator(self, enquiry: str, context: str):
        # Instantiate the prompt helper
        advisor_instance = RAGInstructionsGenerator()
        prompt = advisor_instance.get_prompt_template()
        parser = advisor_instance.output_parser()
        # Pipe it through the LLM and parse
        chain = prompt | self.llm | parser
        return chain.invoke({
            "enquiry": enquiry,
            "context": context
        })