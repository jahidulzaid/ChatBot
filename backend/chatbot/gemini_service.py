import google.generativeai as genai
from django.conf import settings
import logging

# Set up logging
logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        try:
            if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY == 'your_gemini_api_key_here':
                raise ValueError("Gemini API key is not set or is using placeholder value")
            
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            logger.info("Gemini service initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Gemini service: {str(e)}")
            raise
    
    def generate_response(self, message: str, conversation_history: list = None) -> str:
        """
        Generate a response using Gemini Pro API
        
        Args:
            message (str): The user's message
            conversation_history (list): Previous conversation messages for context
        
        Returns:
            str: The AI-generated response
        """
        try:
            logger.info(f"Generating response for message: {message[:50]}...")
            
            # If there's conversation history, include it for context
            if conversation_history:
                # Format conversation history
                context = "\n".join([
                    f"User: {msg['message']}\nAssistant: {msg['response']}" 
                    for msg in conversation_history[-5:]  # Last 5 messages for context
                ])
                prompt = f"Previous conversation:\n{context}\n\nUser: {message}\nAssistant:"
            else:
                prompt = message
            
            logger.debug(f"Sending prompt to Gemini: {prompt[:100]}...")
            response = self.model.generate_content(prompt)
            
            if not response or not response.text:
                logger.error("Gemini returned empty response")
                return "I'm sorry, I received an empty response. Please try again."
            
            logger.info("Successfully generated response from Gemini")
            return response.text
        
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}", exc_info=True)
            
            # Provide more specific error messages
            error_str = str(e).lower()
            if 'api key' in error_str or 'authentication' in error_str:
                return "Authentication error: Please check your Gemini API key."
            elif 'quota' in error_str or 'limit' in error_str:
                return "API quota exceeded. Please try again later."
            elif 'network' in error_str or 'connection' in error_str:
                return "Network error: Please check your internet connection."
            else:
                return f"I'm sorry, I encountered an error: {str(e)}"
    
    def test_connection(self):
        """
        Test the connection to Gemini API
        """
        try:
            test_response = self.model.generate_content("Hello, are you working?")
            return True, test_response.text
        except Exception as e:
            return False, str(e)
