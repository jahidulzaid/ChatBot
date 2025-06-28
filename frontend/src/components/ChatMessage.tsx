import React from 'react';
import './ChatMessage.css';

interface ChatMessageProps {
  message: string;
  response: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, response, timestamp }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div className="chat-message-container">
      <div className="user-message">
        <div className="message-header">
          <span className="sender">You</span>
          <span className="timestamp">{formatTime(timestamp)}</span>
        </div>
        <div className="message-content">{message}</div>
      </div>
      
      <div className="ai-message">
        <div className="message-header">
          <span className="sender">AIbot</span>
          <span className="timestamp">{formatTime(timestamp)}</span>
        </div>
        <div className="message-content">{response}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
