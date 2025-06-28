import axios from 'axios';
import { ChatRequest, ChatResponse, ChatSession, NewSessionResponse } from '../types/chat';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatApi = {
  // Send a chat message
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    try {
      console.log('Sending message:', request);
      const response = await api.post<ChatResponse>('/chat/', request);
      console.log('Received response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Create a new chat session
  createNewSession: async (): Promise<NewSessionResponse> => {
    try {
      const response = await api.post<NewSessionResponse>('/new-session/');
      return response.data;
    } catch (error) {
      console.error('Error creating new session:', error);
      throw error;
    }
  },

  // Get chat history for a session
  getChatHistory: async (sessionId: string): Promise<ChatSession> => {
    try {
      const response = await api.get<ChatSession>(`/history/${sessionId}/`);
      return response.data;
    } catch (error) {
      console.error('Error getting chat history:', error);
      throw error;
    }
  },

  // Test Gemini API connection
  testGemini: async (): Promise<any> => {
    try {
      const response = await api.get('/test-gemini/');
      return response.data;
    } catch (error) {
      console.error('Error testing AI API:', error);
      throw error;
    }
  },
};

export default api;
