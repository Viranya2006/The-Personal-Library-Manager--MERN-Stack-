# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
- ✅ Node.js installed (v14+)
- ✅ MongoDB Atlas account (free tier available)
- ✅ Google API key generated

---

## Step 1: Get Your Credentials

### MongoDB Atlas
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Get connection string: `mongodb+srv://user:password@cluster...`

### Google Books API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project → Enable "Google Books API"
3. Create API key (credentials)

---

## Step 2: Server Setup (3 minutes)

```bash
cd server

# Install packages
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster.mongodb.net/personal-library-manager
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRE=7d
GOOGLE_BOOKS_API_KEY=YOUR_GOOGLE_API_KEY
EOF

# Start server
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB connected: cluster.mongodb.net
```

---

## Step 3: Client Setup (2 minutes)

```bash
cd ../client

# Install packages
npm install

# Start development server
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view personal-library-manager-client in the browser.
Local: http://localhost:3000
```

---

## Step 4: Test the App

1. **Open browser** → `http://localhost:3000`
2. **Register** → Create new account
3. **Search** → Try searching "JavaScript"
4. **Save** → Save a book to your library
5. **Manage** → Go to "My Library", add review, change status

---

## Common Issues & Fixes

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Fix:** Check MONGO_URI in .env - ensure it has proper credentials and IP whitelist

### Google API Error
```
Error: Invalid API key
```
**Fix:** Generate new key in Google Cloud Console → Books API

### CORS Error
```
Access-Control-Allow-Origin header missing
```
**Fix:** Ensure server is running on port 5000

### Port Already in Use
```
listen EADDRINUSE: address already in use :::5000
```
**Fix:** 
```bash
# Kill process on port 5000
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 $(lsof -ti:5000)
```

---

## File Structure Reference

```
├── server/              ← Backend (Port 5000)
│   ├── models/          User & Book schemas
│   ├── controllers/     Business logic
│   ├── routes/          API endpoints
│   └── .env             ← EDIT THIS FILE
│
├── client/              ← Frontend (Port 3000)
│   ├── src/
│   │   ├── components/  Reusable UI
│   │   ├── pages/       Full pages
│   │   └── api/         API calls
│   └── public/
│
└── README.md            Full documentation
```

---

## API Testing (Optional)

Test with curl or Postman:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"pass123"}'
```

### Search Books
```bash
curl http://localhost:5000/api/books/search?query=javascript
```

---

## Next Steps

1. **Customize UI** - Edit CSS files in `client/src/styles/`
2. **Add Features** - Extend models and add new routes
3. **Deploy** - See README.md for deployment instructions
4. **Test** - Run `npm test` in server directory

---

## Need Help?

- Check main README.md for detailed documentation
- Check browser console (F12) for client errors
- Check server terminal for API errors
- Verify all .env variables are set correctly

---

**Happy Coding! 🚀**
