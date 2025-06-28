from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import uuid

from .models import ChatSession, ChatMessage
from .serializers import ChatSessionSerializer, ChatRequestSerializer, ChatMessageSerializer
from .gemini_service import GeminiService

gemini_service = GeminiService()

@api_view(['POST'])
def chat(request):
    """
    Handle chat messages and return AI responses
    """
    serializer = ChatRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    message = serializer.validated_data['message']
    session_id = serializer.validated_data.get('session_id')
    
    # Get or create chat session
    if session_id:
        try:
            chat_session = ChatSession.objects.get(session_id=session_id)
        except ChatSession.DoesNotExist:
            chat_session = ChatSession.objects.create(session_id=session_id)
    else:
        chat_session = ChatSession.objects.create(session_id=uuid.uuid4())
    
    # Get conversation history for context
    previous_messages = ChatMessage.objects.filter(session=chat_session).order_by('created_at')
    conversation_history = [
        {'message': msg.message, 'response': msg.response}
        for msg in previous_messages
    ]
    
    # Generate AI response
    ai_response = gemini_service.generate_response(message, conversation_history)
    
    # Save the message and response
    chat_message = ChatMessage.objects.create(
        session=chat_session,
        message=message,
        response=ai_response
    )
    
    return Response({
        'session_id': str(chat_session.session_id),
        'message': message,
        'response': ai_response,
        'message_id': chat_message.id
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_chat_history(request, session_id):
    """
    Get chat history for a specific session
    """
    try:
        chat_session = ChatSession.objects.get(session_id=session_id)
        serializer = ChatSessionSerializer(chat_session)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ChatSession.DoesNotExist:
        return Response({'error': 'Chat session not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def new_session(request):
    """
    Create a new chat session
    """
    session_id = uuid.uuid4()
    chat_session = ChatSession.objects.create(session_id=session_id)
    
    return Response({
        'session_id': str(chat_session.session_id),
        'created_at': chat_session.created_at
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def test_gemini(request):
    """
    Test the Gemini API connection
    """
    try:
        success, result = gemini_service.test_connection()
        if success:
            return Response({
                'status': 'success',
                'message': 'AI API is working correctly',
                'test_response': result
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'error',
                'message': 'Failed to connect to AI API',
                'error': result
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({
            'status': 'error',
            'message': 'Error testing AI API',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
