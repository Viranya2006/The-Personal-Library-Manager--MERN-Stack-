# 📚 Personal Library Manager

A modern, full-stack MERN application for managing your personal book collection. Search through millions of books using the Google Books API, save your favorites, write reviews, and track your reading progress.

## ✨ Features

### Core Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Book Search**: Search millions of books by title, author, or keyword using Google Books API
- **Personal Library**: Save books to your private library and manage them
- **Book Management**: Add reviews, track reading status (Want to Read, Reading, Completed)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional dashboard-style interface with smooth animations

### Bonus Features ⭐
- **Dark Mode**: Toggle between light and dark themes with persistent storage
- **Advanced Filtering**: Filter search results by type (books/magazines) and availability (free eBooks)
- **Pagination**: Navigate through search results and library with pagination controls
- **Secure API Calls**: Axios interceptors for automatic JWT token attachment and 401 error handling
- **Unit Tests**: Comprehensive Jest tests for backend routes
- **Production Ready**: Environment variables, error handling, and best practices

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library with Hooks
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - Global state management (Auth & Theme)
- **CSS3** - Responsive styling with CSS variables for theme switching

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **Jest & Supertest** - Testing framework

### External APIs
- **Google Books API** - Search and fetch book data

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Books API key

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
cd "The Personal Library Manager (MERN Stack)"
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# GOOGLE_BOOKS_API_KEY=your_google_api_key
# PORT=5000
```

### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Optional: Create .env.local file for custom API URL
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd client
npm start
```
Client will run on `http://localhost:3000`

## 📖 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Book Endpoints

#### Search Books (Public)
```http
GET /api/books/search?query=JavaScript&page=1&filter=free&printType=books
```

#### Save Book to Library
```http
POST /api/books
Authorization: Bearer {token}
Content-Type: application/json

{
  "googleBookId": "abc123",
  "title": "JavaScript: The Good Parts",
  "authors": ["Douglas Crockford"],
  "description": "...",
  "thumbnail": "...",
  "previewLink": "..."
}
```

#### Get User's Library
```http
GET /api/books?page=1&status=Reading&limit=12
Authorization: Bearer {token}
```

#### Update Book
```http
PUT /api/books/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "personalReview": "Great book!",
  "status": "Reading"
}
```

#### Delete Book
```http
DELETE /api/books/:id
Authorization: Bearer {token}
```

## 🔐 Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/personal-library-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
```

### Client (.env.local) - Optional
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Run Backend Tests
```bash
cd server
npm test
```

Tests include:
- User registration
- User login
- Authentication middleware
- Error handling

## 📁 Project Structure

```
The Personal Library Manager (MERN Stack)/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosInstance.js        # Axios with interceptors
│   │   │   └── bookApi.js              # Book API calls
│   │   ├── components/
│   │   │   ├── Header.jsx              # Navigation header
│   │   │   ├── BookCard.jsx            # Individual book display
│   │   │   ├── SearchBar.jsx           # Search component
│   │   │   └── Pagination.jsx          # Pagination controls
│   │   ├── pages/
│   │   │   ├── SearchPage.jsx          # Book search page
│   │   │   ├── LibraryPage.jsx         # User's library
│   │   │   ├── LoginPage.jsx           # Login form
│   │   │   └── RegisterPage.jsx        # Registration form
│   │   ├── context/
│   │   │   ├── AuthContext.js          # Auth state management
│   │   │   └── ThemeContext.js         # Dark mode state
│   │   ├── services/
│   │   │   └── authService.js          # Auth API calls
│   │   ├── styles/
│   │   │   └── global.css              # Global styling
│   │   ├── App.jsx                     # Main app component
│   │   └── index.js                    # React entry point
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js                       # MongoDB connection
│   ├── models/
│   │   ├── User.js                     # User schema
│   │   └── Book.js                     # Book schema
│   ├── controllers/
│   │   ├── authController.js           # Auth logic
│   │   └── bookController.js           # Book logic
│   ├── routes/
│   │   ├── authRoutes.js               # Auth endpoints
│   │   └── bookRoutes.js               # Book endpoints
│   ├── middleware/
│   │   └── authMiddleware.js           # JWT verification
│   ├── tests/
│   │   └── auth.test.js                # Auth tests
│   ├── server.js                       # Express server
│   ├── .env.example                    # Environment template
│   └── package.json
│
└── README.md
```

## 🎨 Features Breakdown

### Authentication System
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Persistent login with localStorage
- Automatic logout on token expiration
- Protected routes that redirect to login

### Search Functionality
- Real-time search with Google Books API
- Pagination support (12 books per page)
- Filter options (free eBooks, print type)
- Responsive grid layout showing book details
- Preview link to Google Books

### Library Management
- Save books to personal collection
- Add custom reviews (up to 5000 characters)
- Track reading status (Want to Read, Reading, Completed)
- Filter library by reading status
- Update and delete books
- Pagination for large libraries

### User Interface
- Modern dashboard-style design
- Dark mode toggle with persistent storage
- Responsive layout (mobile-first approach)
- Loading and error states
- Smooth animations and transitions
- Professional color scheme and typography

### Security
- JWT token in Authorization header
- Password hashing with bcryptjs (10 salt rounds)
- Protected API routes with middleware
- Secure HTTP-only considerations
- Input validation on both client and server
- CORS enabled for development

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🚢 Deployment Notes

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```
Deploy the `build` folder

### Backend (Heroku/Railway)
```bash
# Ensure Procfile exists
# Set environment variables in platform
# Deploy from server directory
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check MONGO_URI in .env
- Ensure IP whitelist includes your IP in Atlas
- Verify username and password are URL-encoded if needed

### Google Books API Issues
- Verify API key is enabled in Google Cloud Console
- Check API quota limits
- Ensure correct API is selected (Books API)

### JWT Token Issues
- Clear localStorage if token is invalid
- Check JWT_SECRET matches between login and requests
- Verify token expiration time is reasonable

### CORS Issues
- Ensure backend has CORS enabled
- Check API_URL in client .env.local
- Verify proxy setting in client package.json if using

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [JWT Introduction](https://jwt.io)
- [Google Books API](https://developers.google.com/books)
- [Axios Documentation](https://axios-http.com)

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Created as a MERN Stack technical assessment project.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Verify all environment variables are set correctly

---

**Happy Reading! 📖✨**
