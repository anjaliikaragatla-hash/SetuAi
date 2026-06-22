import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import google.generativeai as genai
import typing_extensions as typing
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="SetuAI Engine", description="FastAPI + Gemini service for SetuAI")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    # We will print a warning but not crash, allowing the user to configure it later
    print("WARNING: GEMINI_API_KEY is not set in environment or .env file.")

genai.configure(api_key=GEMINI_API_KEY or "DUMMY_KEY")
model = genai.GenerativeModel("gemini-1.5-flash")

# Define Pydantic request models
class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en"
    history: Optional[List[Dict[str, str]]] = []

class EligibilityRequest(BaseModel):
    schemeTitle: str
    schemeDescription: str
    eligibilityCriteria: str
    userProfile: Dict[str, Any]

class SummarizeRequest(BaseModel):
    text: str
    language: Optional[str] = "en"

# Define Structured Output Schema for Eligibility Checker
class EligibilityResponse(typing.TypedDict):
    isEligible: bool
    reason: str
    missingRequirements: List[str]
    nextSteps: List[str]


@app.get("/")
def read_root():
    return {"status": "SetuAI Python Engine is running!"}


# 1. MULTILINGUAL AI CHAT
@app.post("/api/ai/chat")
async def chat(request: ChatRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured on the backend.")

    # Format history and user message with regional language instruction
    system_instruction = (
        "You are SetuAI, an AI digital assistant built for social impact. "
        "Your goal is to help poor and underserved citizens discover government schemes, scholarships, and benefits. "
        "Keep your language very simple, clear, and empathetic. Avoid technical jargon. "
        f"You MUST respond entirely in the language corresponding to language code: '{request.language}'. "
        "Format your answer with simple bullet points and short paragraphs to make it highly readable."
    )

    try:
        # Initialize chat with system instruction
        chat_session = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=system_instruction
        ).start_chat(history=[])
        
        # Send message
        response = chat_session.send_message(request.message)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")


# 2. AI ELIGIBILITY CHECKER (Structured JSON Output)
@app.post("/api/ai/check-eligibility")
async def check_eligibility(request: EligibilityRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured on the backend.")

    prompt = f"""
    Evaluate if the user is eligible for the following welfare scheme.
    
    [SCHEME DETAILS]
    Title: {request.schemeTitle}
    Description: {request.schemeDescription}
    Eligibility Criteria Rules: {request.eligibilityCriteria}
    
    [USER PROFILE Details]
    {request.userProfile}
    
    Analyze carefully. If any required information in the USER PROFILE is missing to make a decision, note it in 'missingRequirements'.
    Provide a clear, brief explanation in 'reason' in simple language.
    Suggest actionable 'nextSteps' (e.g., documents they need to gather, links, or what details they must supply).
    """

    try:
        # Request structured JSON output matching the EligibilityResponse TypedDict
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=EligibilityResponse,
                temperature=0.2,
            )
        )
        return response.text  # returns structured JSON string directly
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")


# 3. POLICY SUMMARIZER
@app.post("/api/ai/summarize")
async def summarize(request: SummarizeRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured on the backend.")

    prompt = f"""
    Explain the following government policy / scheme document in extremely simple terms for an underserved citizen.
    Highlight:
    1. What is it? (Core benefits)
    2. Who is eligible?
    3. How to apply?
    
    Translate and write the response in the language corresponding to language code: '{request.language}'.
    Use very simple vocabulary, short sentences, and bullet points.
    
    [DOCUMENT TEXT]
    {request.text}
    """

    try:
        response = model.generate_content(prompt)
        return {"summary": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")
