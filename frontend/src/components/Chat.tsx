import React, { useState, useEffect, useRef } from 'react';
import { chatApi } from '../services/api';
import { ChatMessage as ChatMessageType } from '../types/chat';
import ChatMessage from './ChatMessage';
import './Chat.css';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize a new chat session
  const startNewSession = async () => {
    try {
      const response = await chatApi.createNewSession();
      setSessionId(response.session_id);
      setMessages([]);
      setError(null);
    } catch (err) {
      setError('Failed to start new session');
      console.error('Error starting new session:', err);
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await chatApi.sendMessage({
        message: currentMessage,
        session_id: sessionId || undefined,
      });

      // If this is the first message and we don't have a session ID, set it
      if (!sessionId) {
        setSessionId(response.session_id);
      }

      // Add the new message to the list
      const newMessage: ChatMessageType = {
        id: response.message_id,
        message: response.message,
        response: response.response,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage('');
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Load chat history for existing session
  const loadChatHistory = async (sessionId: string) => {
    try {
      const response = await chatApi.getChatHistory(sessionId);
      setMessages(response.messages);
      setSessionId(response.session_id);
    } catch (err) {
      setError('Failed to load chat history');
      console.error('Error loading chat history:', err);
    }
  };

  // Test AI API connection
  const testGeminiConnection = async () => {
    try {
      setError(null);
      const response = await chatApi.testGemini();
      alert(`API Test: ${response.status}\n${response.message}\nResponse: ${response.test_response}`);
    } catch (err) {
      setError('Failed to test AI API');
      console.error('Error testing AI API:', err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Aibot</h1>
        <div className="chat-controls">
          <button onClick={startNewSession} className="new-session-btn">
            New Session
          </button>
          <button onClick={testGeminiConnection} className="new-session-btn">
            Test API
          </button>
          {sessionId && (
            <span className="session-id">Session: {sessionId.slice(0, 8)}...</span>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to Aibot!</h2>
            <p>Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              response={msg.response}
              timestamp={msg.created_at}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="message-input"
          rows={3}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !currentMessage.trim()}
          className="send-button"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
