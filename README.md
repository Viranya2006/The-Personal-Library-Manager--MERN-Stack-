# 📚 Personal Library Manager (MERN Stack)

🔗 Live Demo: https://the-personal-library-manager-mern-s.vercel.app/

A **full-stack MERN application** that allows users to search books via the Google Books API and manage a **personal reading library** with authentication, reviews, and reading status tracking.

This project was built as a **full-stack internship assessment** to demonstrate real-world MERN architecture, secure authentication, REST APIs, and clean frontend state management.

---

## 🚀 Live Features

### 🔓 Public

* Search books by **title, author, or keyword**
* Real-time results from **Google Books API**
* Filters (Free eBooks, Print Type)
* Pagination for large result sets

### 🔐 Authenticated Users

* Secure **JWT-based authentication**
* Save books to a **personal library**
* Update **reading status** (Want to Read / Reading / Completed)
* Add and edit **personal reviews**
* Delete books from the library

### 🎨 UI / UX

* Modern **dashboard-style UI**
* Sidebar navigation
* Card-based layout
* Responsive design (desktop, tablet, mobile)
* Dark / Light mode toggle

---

## 🛠 Tech Stack

### Frontend

* React 18 (Hooks & Functional Components)
* React Router v6
* Axios (with interceptors)
* Context API (Auth & Theme)
* CSS3 (custom dashboard styling)

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose ODM
* JWT Authentication
* bcryptjs (password hashing)

### External API

* Google Books API

### Testing

* Jest
* Supertest (backend route testing)

---

## 🧠 Architecture Overview

**MERN Architecture with clean separation of concerns**

```
client/
 ├── api/          # Axios instance & interceptors
 ├── components/   # Reusable UI components
 ├── pages/        # Page-level views
 ├── context/      # Auth & theme state
 └── styles/       # Global styling

server/
 ├── models/       # Mongoose schemas
 ├── routes/       # REST API routes
 ├── controllers/  # Business logic
 ├── middleware/   # JWT auth middleware
 └── tests/        # Backend tests
```

### Security Highlights

* Passwords hashed with **bcrypt**
* JWT stored client-side and attached via **Axios interceptors**
* Protected routes enforced with middleware
* User-scoped database access (no data leakage)

---

## ⚙️ Environment Variables

Create a `.env` file at the **project root**:

```env
# Server
SERVER_PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
GOOGLE_BOOKS_API_KEY=your_google_books_api_key

# Client
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

---

## 🏃‍♂️ Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Viranya2006/The-Personal-Library-Manager--MERN-Stack-
cd The-Personal-Library-Manager--MERN-Stack-
```

### 2️⃣ Start Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3️⃣ Start Frontend

```bash
cd client
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🧪 Testing

Run backend tests:

```bash
cd server
npm test
```

Includes tests for:

* User registration & login
* JWT authentication
* Protected routes

---

## 🎯 Skills Demonstrated

* Full-stack MERN development
* RESTful API design
* JWT authentication & authorization
* MongoDB schema design
* Secure password handling
* Axios interceptors & global error handling
* Responsive UI design
* Clean project architecture
* Backend unit testing

---

## 📈 Why This Project Matters

This project demonstrates the ability to:

* Build **end-to-end features** (UI → API → DB)
* Design **secure, scalable architectures**
* Integrate **third-party APIs**
* Write **production-quality code**
* Deliver a **polished, user-focused product**

It reflects real-world full-stack development practices rather than a tutorial-level app.

---

## 🚀 Future Enhancements

* Reading analytics dashboard
* Recommendations based on saved books
* Infinite scroll search
* Social sharing
* Mobile app (React Native)

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Author

**Viranya Gangamina**
Full-Stack Developer (MERN)
GitHub: [https://github.com/Viranya2006](https://github.com/Viranya2006)

