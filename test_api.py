import requests
import json

# Test the Gemini API endpoint
def test_gemini_api():
    url = "http://localhost:8000/api/test-gemini/"
    try:
        response = requests.get(url)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

# Test sending a chat message
def test_chat_api():
    url = "http://localhost:8000/api/chat/"
    data = {
        "message": "Hello, how are you today?"
    }
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print("Testing Gemini API connection...")
    test_gemini_api()
    print("\n" + "="*50 + "\n")
    print("Testing chat API...")
    test_chat_api()
