export interface ChatMessage {
  id: number;
  message: string;
  response: string;
  created_at: string;
}

export interface ChatSession {
  id: number;
  session_id: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessage[];
}

export interface ChatRequest {
  message: string;
  session_id?: string;
}

export interface ChatResponse {
  session_id: string;
  message: string;
  response: string;
  message_id: number;
}

export interface NewSessionResponse {
  session_id: string;
  created_at: string;
}
