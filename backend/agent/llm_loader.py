from langchain.chat_models import ChatOpenAI

def get_llm(api_key: str, model_name: str = "gpt-4", temperature: float = 0.2):
    return ChatOpenAI(
        openai_api_key=api_key,
        model_name=model_name,
        temperature=temperature,
    )
