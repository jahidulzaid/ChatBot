from django.urls import path
from . import views

urlpatterns = [
    path('chat/', views.chat, name='chat'),
    path('new-session/', views.new_session, name='new_session'),
    path('history/<uuid:session_id>/', views.get_chat_history, name='chat_history'),
    path('test-gemini/', views.test_gemini, name='test_gemini'),
]
