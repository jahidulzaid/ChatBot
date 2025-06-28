# Aibot with Django & TypeScript

A full-stack chatbot application using Google's Gemini Pro API with a Django REST API backend and a React TypeScript frontend.

## Features

- 🤖 Powered by Google Gemini Pro AI
- 💬 Real-time chat interface
- 📝 Conversation history and session management
- 🔒 Session-based chat persistence
- 📱 Responsive design
- 🎯 TypeScript for type safety
- 🚀 Django REST API backend

## Technology Stack

### Backend
- **Django 5.2** - Web framework
- **Django REST Framework** - API development
- **Google Generative AI** - Gemini Pro API integration
- **SQLite** - Database (easily replaceable)
- **Django CORS Headers** - Cross-origin requests

### Frontend
- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
gemini-chatbot/
├── backend/                 # Django backend
│   ├── chatbot_project/    # Django project
│   ├── chatbot/           # Django app
│   │   ├── models.py      # Database models
│   │   ├── views.py       # API views
│   │   ├── serializers.py # DRF serializers
│   │   ├── gemini_service.py # Gemini API service
│   │   └── urls.py        # URL routing
│   ├── manage.py
│   └── .env              # Environment variables
└── frontend/             # React TypeScript frontend
    ├── src/
    │   ├── components/   # React components
    │   ├── services/     # API services
    │   ├── types/        # TypeScript types
    │   └── App.tsx
    └── package.json
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn
- Google Gemini API key

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install django djangorestframework django-cors-headers google-generativeai python-dotenv
   ```

3. **Configure environment variables:**
   Edit `backend/.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Start the Django server:**
   ```bash
   python manage.py runserver
   ```
   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   Frontend will be available at `http://localhost:3000`

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## API Endpoints

### Backend API Endpoints

- `POST /api/chat/` - Send a chat message
- `POST /api/new-session/` - Create a new chat session
- `GET /api/history/{session_id}/` - Get chat history for a session

### Example API Usage

**Send a message:**
```json
POST /api/chat/
{
  "message": "Hello, how are you?",
  "session_id": "optional-session-id"
}
```

**Response:**
```json
{
  "session_id": "uuid-session-id",
  "message": "Hello, how are you?",
  "response": "Hello! I'm doing well, thank you for asking...",
  "message_id": 123
}
```

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Start chatting with the Gemini AI
4. Use "New Session" button to start a fresh conversation
5. Your conversation history is automatically saved

## Features in Detail

### Session Management
- Each conversation is stored in a session
- Sessions persist across page refreshes
- Users can start new sessions anytime

### Conversation Context
- The chatbot maintains context within a session
- Previous messages are included for better responses
- Last 5 messages are used for context to avoid token limits

### Error Handling
- Graceful error handling for API failures
- User-friendly error messages
- Loading states for better UX

## Customization

### Styling
- Modify CSS files in `frontend/src/components/`
- Update color scheme in CSS variables
- Responsive design included

### Backend Configuration
- Adjust context length in `gemini_service.py`
- Modify database models in `models.py`
- Add authentication if needed

## Deployment

### Backend Deployment
- Set `DEBUG=False` in production
- Use a production database (PostgreSQL recommended)
- Configure proper CORS settings
- Use environment variables for sensitive data

### Frontend Deployment
- Build the project: `npm run build`
- Deploy the `build` folder to your hosting service
- Update API URL in `api.ts` for production

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure `django-cors-headers` is installed and configured
   - Check CORS_ALLOWED_ORIGINS in settings.py

2. **API Key Issues:**
   - Verify your Gemini API key is correct
   - Check if the API key has proper permissions

3. **Database Issues:**
   - Run migrations: `python manage.py migrate`
   - Reset database if needed: Delete `db.sqlite3` and re-run migrations

4. **Frontend Build Issues:**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Review the API documentation
3. Create an issue in the repository

## Acknowledgments

- Google Gemini Pro API for AI capabilities
- Django and React communities for excellent frameworks
- Contributors and testers
# ChatBot
