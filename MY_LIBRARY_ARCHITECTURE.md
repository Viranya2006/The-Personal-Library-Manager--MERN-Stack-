# My Library - Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (React)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  LibraryPage.jsx                                                 │
│  ├─ useAuth() → Gets isAuthenticated                             │
│  ├─ useNavigate() → Redirects if needed                          │
│  ├─ useState → Manages books, totalBooks, filters, loading       │
│  └─ useEffect → Triggers fetchLibrary()                          │
│                ↓                                                  │
│           fetchLibrary()                                         │
│           ├─ Call: bookService.getUserLibrary(page, status)     │
│           ├─ Update: setBooks(), setTotalBooks()                │
│           └─ Show: Loading → Data → or Error                    │
│                ↓                                                  │
│           bookService.js                                         │
│           └─ Call: apiClient.get('/books?...')                  │
│                ↓                                                  │
│           axios Interceptor                                      │
│           └─ Attach: Authorization: Bearer <JWT>                │
│                ↓                                                  │
└────────────────────────────────────────────────────────────────┬┘
                                                                   │
                        HTTP GET Request                           │
                                                                   │
┌──────────────────────────────────────────────────────────────────┤
│                      Backend (Express)                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Route: GET /api/books?page=1&limit=12&status=...               │
│  └─ bookRoutes.js → getUserLibrary handler                      │
│       ↓                                                           │
│  Middleware: authMiddleware                                      │
│  └─ Extract JWT from Authorization header                       │
│  └─ Verify JWT signature                                        │
│  └─ Extract user.id from JWT payload                            │
│       ↓                                                           │
│  Controller: bookController.getUserLibrary()                    │
│  ├─ Get params: page, status, limit from req.query              │
│  ├─ Build query: { user: req.user.id }                          │
│  ├─ Add filter: if status, add status to query                  │
│  ├─ Add sorting: sort({ createdAt: -1 })                        │
│  ├─ Add pagination: skip(), limit()                             │
│  └─ Calculate: totalBooks, totalPages                           │
│       ↓                                                           │
│  Database: MongoDB                                               │
│  └─ Query: db.books.find({ user: ObjectId(...) })               │
│       .sort({ createdAt: -1 })                                  │
│       .skip(0)                                                   │
│       .limit(12)                                                 │
│       ↓ Returns books array                                      │
│                                                                   │
│  Response JSON:                                                  │
│  {                                                               │
│    "success": true,                                              │
│    "books": [ {...}, {...}, ... ],                              │
│    "totalBooks": 45,                                             │
│    "currentPage": 1,                                             │
│    "totalPages": 4                                               │
│  }                                                               │
└──────────────────────────────────────────────────────────────────┤
                                                                   │
                    HTTP 200 + JSON Response                       │
                                                                   │
┌──────────────────────────────────────────────────────────────────┤
│                   Browser receives response                       │
│                                                                    │
│  Update state:                                                   │
│  ├─ setBooks(result.books)                                       │
│  ├─ setTotalBooks(result.totalBooks)                             │
│  ├─ setIsLoading(false)                                          │
│  └─ setError('')                                                 │
│       ↓                                                           │
│  Re-render component:                                            │
│  ├─ Header: "📚 My Library" + total count                        │
│  ├─ Filters: All Books, Want to Read, Reading, Completed        │
│  ├─ Grid: BookCard × 12 (or fewer)                               │
│  └─ Pagination: Page 1 of 4 (if applicable)                      │
│       ↓                                                           │
│  User sees: Books displayed! ✅                                  │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## Request/Response Flow

### Request Details

```
GET /api/books?page=1&limit=12&status=

Headers:
├─ Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
├─ Content-Type: application/json
└─ User-Agent: Mozilla/5.0...

Query Parameters:
├─ page=1 (page number, 1-indexed)
├─ limit=12 (books per page)
└─ status= (optional: 'Want to Read', 'Reading', 'Completed')
```

### Response Details

```json
{
  "success": true,
  "books": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "googleBookId": "1Zb_EAAAQBAJ",
      "title": "The Great Gatsby",
      "authors": ["F. Scott Fitzgerald"],
      "description": "A classic American novel...",
      "thumbnail": "http://books.google.com/books/content?id=...",
      "previewLink": "http://books.google.com/books?id=...",
      "status": "Completed",
      "personalReview": "Amazing read!",
      "user": "507f1f77bcf86cd799439012",
      "createdAt": "2024-01-13T10:30:00Z",
      "updatedAt": "2024-01-13T10:30:00Z"
    },
    { ... more books ... }
  ],
  "totalBooks": 45,
  "currentPage": 1,
  "totalPages": 4
}
```

## State Transitions

```
Initial State:
{
  books: [],
  totalBooks: 0,
  isLoading: true,
  error: ''
}
          ↓
    fetchLibrary() called
          ↓
Loading State:
{
  books: [],
  totalBooks: 0,
  isLoading: true,  ← Shows "Loading your library..."
  error: ''
}
          ↓
API Response Success ← OR → API Response Error
          ↓                           ↓
Success State:               Error State:
{                            {
  books: [...],              books: [],
  totalBooks: 45,            totalBooks: 0,
  isLoading: false,          isLoading: false,
  error: ''  ← Render grid   error: 'Error loading...'
}                            }
                             ↓
                        Shows error message
```

## Component Hierarchy

```
App.jsx
└─ Routes
   └─ Route path="/library"
      └─ LibraryPage.jsx ✅ (READ ONLY)
         ├─ Header section
         ├─ Filter buttons section
         ├─ Books grid section (conditional)
         │  └─ BookCard.jsx × 12 (or fewer)
         │     ├─ Thumbnail image
         │     ├─ Title
         │     ├─ Authors
         │     ├─ Status badge
         │     └─ Review text
         └─ Pagination component (conditional)
            └─ Page buttons
```

## Data Flow with Status Filter

```
User clicks "Reading" filter
           ↓
handleStatusFilter('Reading')
           ↓
setSelectedStatus('Reading')
           ↓
useEffect triggers (selectedStatus dependency)
           ↓
fetchLibrary(1, 'Reading')
           ↓
bookService.getUserLibrary(1, 'Reading', 12)
           ↓
apiClient.get('/books?page=1&limit=12&status=Reading')
           ↓
Backend receives request:
  const { status } = req.query;  // 'Reading'
  const query = { user: req.user.id, status: 'Reading' };
           ↓
MongoDB finds only books where status='Reading' for user
           ↓
Response with filtered books
           ↓
Frontend updates state:
  setBooks(filtered_books)
  setTotalBooks(filtered_count)
           ↓
Re-render with filtered books
```

## Authentication Flow

```
1. User logs in
   └─ Token stored in localStorage

2. User navigates to /library
   └─ LibraryPage.jsx renders

3. useEffect checks authentication
   ├─ const { isAuthenticated } = useAuth()
   ├─ Gets value from AuthContext
   └─ AuthContext reads from localStorage

4. If NOT authenticated:
   └─ navigate('/login')  ← Redirect immediately

5. If authenticated:
   └─ Proceed with fetchLibrary()

6. When making API call:
   └─ axios interceptor
      ├─ Gets token from localStorage
      ├─ Attaches to header: Authorization: Bearer <token>
      └─ Sends request

7. Backend receives request:
   ├─ authMiddleware verifies JWT
   ├─ Extracts user.id from payload
   ├─ Attaches to req.user.id
   └─ Passes to controller

8. Controller queries with user.id:
   └─ Book.find({ user: req.user.id })
      ├─ Only returns user's books
      └─ User isolation enforced
```

## Error Handling Flow

```
User navigates to /library
           ↓
useEffect calls fetchLibrary()
           ↓
Try to fetch books
           ├─ Success ✅
           │  ├─ setBooks(data)
           │  ├─ setError('')
           │  └─ setIsLoading(false)
           │     ↓ Render books
           │
           └─ Error ❌
              ├─ Catch error in catch block
              ├─ setError('Error loading your library...')
              ├─ setIsLoading(false)
              ├─ console.error(err)
              └─ setBooks([])
                 ↓ Render error message
```

## Filtering Logic

```
User selects status filter:
  'Want to Read' | 'Reading' | 'Completed' | '' (All)
           ↓
Backend validation:
  if (status && ['Want to Read', 'Reading', 'Completed'].includes(status)) {
    query.status = status;
  }
           ↓
Database query:
  Book.find({ user: id, status: 'Want to Read' })
           ↓
Filter results returned
           ↓
Display only filtered books

All Books filter:
  No status added to query
           ↓
Database query:
  Book.find({ user: id })
           ↓
All user's books returned
```

## Pagination Logic

```
User on page 1 (default)
           ↓
Display books 1-12
  skip = (1-1) * 12 = 0
  limit = 12
  ↓
Database: .skip(0).limit(12)
           ↓
User clicks page 2
  handlePageChange(2)
  ↓
Display books 13-24
  skip = (2-1) * 12 = 12
  limit = 12
  ↓
Database: .skip(12).limit(12)
           ↓
User clicks page 3
  handlePageChange(3)
  ↓
Display books 25-36
  skip = (3-1) * 12 = 24
  limit = 12
  ↓
Database: .skip(24).limit(12)
```

## Responsive Design Breakpoints

```
Desktop (>768px):
  Books grid: 4 columns
  Filters: Horizontal row
  Font sizes: Normal
           ↓
Tablet (480px - 768px):
  Books grid: 3 columns
  Filters: Wrapped row
  Font sizes: Slightly smaller
           ↓
Mobile (<480px):
  Books grid: 2 columns
  Filters: Stacked vertically
  Font sizes: Small
  Buttons: Full width
```

## API Endpoint Summary

```
Endpoint: GET /api/books

Purpose: Fetch user's saved books with optional filtering and pagination

Authentication: REQUIRED (JWT token in Authorization header)

Query Parameters:
  page (optional, default=1): Page number
  limit (optional, default=12): Books per page
  status (optional): 'Want to Read', 'Reading', 'Completed', or omit for all

Success Response (200):
  {
    "success": true,
    "books": [...],
    "totalBooks": 45,
    "currentPage": 1,
    "totalPages": 4
  }

Error Response (401):
  Unauthorized - Invalid or missing JWT

Error Response (500):
  {
    "success": false,
    "message": "Error fetching library",
    "error": "..."
  }

User Isolation:
  Backend automatically filters by req.user.id from JWT
  User can ONLY see their own books, never other users' books
```

---

**All components shown work together to create a seamless reading experience for viewing your saved books!** 📚
