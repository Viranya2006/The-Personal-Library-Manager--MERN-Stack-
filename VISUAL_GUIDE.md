# Visual Guide - Application Features

## Application Flow

```
Landing / Home Page
├─ Search Books (Google Books API)
│  └─ Not logged in? Just search
│  └─ Logged in? See "Save to Library" button
│
├─ "My Library" Link (Navigation)
│  └─ Not logged in? Redirects to login
│  └─ Logged in? Shows your library
│
└─ Login / Sign Up buttons
   └─ Create account or login
```

---

## Home/Search Page

### Layout
```
┌─────────────────────────────────────┐
│        Personal Library Manager     │
├─────────────────────────────────────┤
│ [Search] [My Library]  [Dark] [User]│
├─────────────────────────────────────┤
│                                     │
│  Search for books...  [Search]      │
│                                     │
├─────────────────────────────────────┤
│  Harry Potter Results (12 per page) │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Photo │ │Photo │ │Photo │        │
│  │      │ │      │ │      │        │
│  │Title │ │Title │ │Title │        │
│  │Author│ │Author│ │Author│        │
│  │[Save]│ │[Save]│ │[Save]│        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  [← Page 1 of 5] [Next →]           │
└─────────────────────────────────────┘
```

### What You Can Do
- ✅ Search for any book
- ✅ See 12 results per page
- ✅ Paginate through results
- ✅ Save book (if logged in)
- ✅ View preview on Google Books
- ✅ Not logged in? See "Save" disabled
- ✅ Already saved? See "✓ Saved" badge

---

## My Library Page

### Layout
```
┌─────────────────────────────────────┐
│    📚 My Library                    │
│    45 books in your collection      │
├─────────────────────────────────────┤
│ [All] [Want] [Reading] [Completed]  │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │ Photo  │ The Great Gatsby     │  │
│  │        ├─────────────────────┤  │
│  │        │ by F. Scott...      │  │
│  │        │                     │  │
│  │        │ Status: [Reading ▼] │  │
│  │        │                     │  │
│  │        │ Review:             │  │
│  │        │ [Amazing book!  ]   │  │
│  │        │                     │  │
│  │        │ [Preview] [Update]  │  │
│  │        │           [Remove]  │  │
│  └──────────────────────────────┘  │
│                                     │
│  [← Page 1 of 4] [Next →]           │
└─────────────────────────────────────┘
```

### What You Can Do
- ✅ See all your saved books
- ✅ Filter by status (4 options)
- ✅ See book details
- ✅ Change reading status (dropdown)
- ✅ Add/edit personal review
- ✅ Click [Update] to save changes
- ✅ Click [Remove] to delete book
- ✅ Confirmation before delete
- ✅ See count decrease after delete
- ✅ Paginate through books (12 per page)

---

## Book Card - Full Details

### Search Page Card
```
┌──────────────────┐
│   Thumbnail      │
│   Image          │
├──────────────────┤
│ Book Title       │
│                  │
│ by Author(s)     │
│                  │
│ Description text │
│ (first 100 chars)│
│                  │
│ [Preview]        │
│ [Save to Lib]    │
│                  │
│ (or ✓ Saved)     │
└──────────────────┘
```

### Library Page Card
```
┌──────────────────┐
│   Thumbnail      │
│   Image          │
├──────────────────┤
│ Book Title       │
│                  │
│ by Author(s)     │
│                  │
│ Status:          │
│ [Reading     ▼]  │ ← Dropdown
│                  │
│ Personal Review: │
│ [Great book!  ]  │ ← Textarea
│ [I loved this ]  │
│                  │
│ [Preview]        │
│ [Update] NEW     │
│ [Remove] NEW     │
└──────────────────┘
```

---

## User Journey - Update Book

```
1. On My Library page
   ↓
2. Find a book you read
   ↓
3. Click status dropdown
   ├─ Want to Read
   ├─ Reading ← select this
   └─ Completed
   ↓
4. Type review: "Great book!"
   ↓
5. Click [Update]
   ↓
6. Loading... (button disabled)
   ↓
7. ✓ "Book updated successfully!"
   ↓
8. Card shows "Reading" + "Great book!"
   ↓
9. Changes saved to database
```

---

## User Journey - Delete Book

```
1. On My Library page
   ↓
2. Find a book to remove
   ↓
3. Click [Remove]
   ↓
4. Browser shows:
   "Are you sure you want to
    remove this book from your library?"
   ↓
5. [Cancel]  [OK]
   ↓
   (if Cancel) → Nothing happens, card stays
   (if OK) → Continue
   ↓
6. Loading... (button disabled)
   ↓
7. ✓ "Book removed from your library"
   ↓
8. Card disappears from grid
   ↓
9. Count decreases by 1
   ↓
10. Changes saved to database
```

---

## Status Indicator Guide

### Book Card Badges

#### In Search Results
```
┌─────────────────┐
│   Book Card     │
│   (Not Saved)   │
│                 │
│ [Save to Lib]   ← Click to save
└─────────────────┘

OR

┌─────────────────┐
│   Book Card     │
│   (Saved)       │
│                 │
│ ✓ Saved         ← Shows saved
└─────────────────┘
```

#### In Your Library
```
Status: [Want to Read ▼]    ← Want to read
Status: [Reading ▼]         ← Currently reading
Status: [Completed ▼]       ← Already read
```

---

## Filter States

### My Library Filters
```
┌─────────────────────────────────────┐
│ [All Books] [Want] [Reading] [Comp] │
└─────────────────────────────────────┘

Active filter highlighted:
┌─────────────────────────────────────┐
│ [All Books] [Want] [Reading] [Comp] │
│                 ↑
│            (highlighted)
└─────────────────────────────────────┘

Click to filter → Show only books with that status
Pagination resets to page 1
```

---

## Data Flow - Update Book

```
User changes status dropdown
         ↓
onStatusChange triggered
         ↓
State updates: status = "Reading"
         ↓
User types review
         ↓
onReviewChange triggered
         ↓
State updates: editingReviews[bookId] = "Great book!"
         ↓
User clicks [Update]
         ↓
handleUpdateBook called
         ↓
API call: PUT /api/books/{id}
  {
    status: "Reading",
    personalReview: "Great book!"
  }
         ↓
Backend verifies JWT + user owns book
         ↓
MongoDB updates book document
         ↓
Response: Updated book data
         ↓
Frontend updates state
         ↓
Card re-renders with new values
         ↓
Success message shown
```

---

## Data Flow - Delete Book

```
User clicks [Remove]
         ↓
Browser confirmation:
"Are you sure?"
         ↓
User clicks [OK]
         ↓
handleDeleteBook called
         ↓
API call: DELETE /api/books/{id}
         ↓
Backend verifies JWT + user owns book
         ↓
MongoDB deletes book document
         ↓
Response: Deletion confirmed
         ↓
Frontend filters out book from books array
         ↓
Total count decreases by 1
         ↓
Grid re-renders without that card
         ↓
Success message shown
```

---

## Loading States

### Search Results Loading
```
"Loading search results..."

(shows while fetching from Google Books API)
```

### Library Loading
```
"Loading your library..."

(shows while fetching user's books from database)
```

### Update/Delete Loading
```
[Update] button becomes disabled
[Remove] button becomes disabled

(while API request is in progress)
```

---

## Error States

### If Search Fails
```
❌ "Error searching for books"
(User can try again)
```

### If Library Load Fails
```
❌ "Error loading your library. Please try again."
(Can retry by refreshing page)
```

### If Update Fails
```
❌ "Error updating book. Please try again."
(Button re-enables, can try again)
```

### If Delete Fails
```
❌ "Error removing book. Please try again."
(Book still in library, can try again)
(Can click [Remove] again)
```

---

## Empty State

### When No Books Saved
```
┌──────────────────────────────┐
│  Your library is empty       │
│                              │
│  Start by searching for      │
│  books and adding them to    │
│  your collection             │
│                              │
│  [Search Books]              │
└──────────────────────────────┘
```

---

## Responsive Design

### Desktop (>768px)
```
┌─────────────────────────────────────┐
│ [Logo] [Search] [Library] [Accts]   │
├─────────────────────────────────────┤
│ Book1  Book2   Book3   Book4        │
│ Book5  Book6   Book7   Book8        │
│ Book9  Book10  Book11  Book12       │
│ (4 columns)                         │
└─────────────────────────────────────┘
```

### Tablet (480-768px)
```
┌────────────────────────┐
│ [Logo] [Lib] [Acct]    │
├────────────────────────┤
│ Book1  Book2   Book3   │
│ Book4  Book5   Book6   │
│ Book7  Book8   Book9   │
│ (3 columns)            │
└────────────────────────┘
```

### Mobile (<480px)
```
┌──────────────┐
│ [≡] [Logo]   │
├──────────────┤
│ Book1 Book2  │
│ Book3 Book4  │
│ Book5 Book6  │
│ (2 columns)  │
└──────────────┘
```

---

## Navigation

### Authenticated User
```
Home Page (Search)
    ↓
    ├─ Click "My Library" → Library Page
    ├─ Click "Logout" → Logged out
    └─ Continue searching

Library Page (Manage Books)
    ↓
    ├─ Click "Search" → Home Page
    ├─ Click "Logout" → Logged out
    └─ Update/delete books
```

### Unauthenticated User
```
Home Page (Search)
    ↓
    ├─ Click "My Library" → Redirected to Login
    ├─ Click "Login" → Login Page
    ├─ Click "Sign Up" → Sign Up Page
    └─ Continue searching (public search works)

Login Page
    ↓
    ├─ Click "Sign Up" → Sign Up Page
    └─ Login → Home Page

Sign Up Page
    ↓
    ├─ Click "Login" → Login Page
    └─ Register → Home Page
```

---

## Key UI Elements

### Buttons

**Primary Button**
```
[Search]  [Save to Library]  [Update]
(Blue, filled)
```

**Danger Button**
```
[Remove]
(Red, filled)
```

**Outline Button**
```
[Preview]
(Outlined style)
```

**Disabled State**
```
[Update]  (grayed out while loading)
[Remove]
```

### Input Fields

**Dropdown Select**
```
Status: [Reading ▼]

(Click to open options)
- Want to Read
- Reading ✓
- Completed
```

**Text Area**
```
Personal Review:
[Great book! Amazing...     ]
[________________________   ]
(4 rows, word wrap)
```

---

## Confirmation Dialogs

### Delete Confirmation
```
┌────────────────────────────────┐
│                                │
│  Are you sure you want to      │
│  remove this book from your    │
│  library?                      │
│                                │
│  [Cancel]     [OK]             │
│                                │
└────────────────────────────────┘
```

---

## Success/Error Messages

### Success
```
✓ "Book updated successfully!"
✓ "Book removed from your library"
✓ "Book saved to library"
```

### Error
```
❌ "Error updating book. Please try again."
❌ "Error removing book. Please try again."
❌ "Error loading your library. Please try again."
❌ "Invalid status. Must be: Want to Read, Reading, or Completed"
```

---

## Complete User Interface

All features visible on My Library page:

1. **Top Navigation** - Logo, links, user menu
2. **Header** - Title, book count
3. **Filters** - Status buttons
4. **Books Grid** - Cards with full details
5. **Status Dropdown** - Change reading status
6. **Review Textarea** - Add/edit review
7. **Update Button** - Save changes
8. **Remove Button** - Delete with confirmation
9. **Pagination** - Navigate pages
10. **Error/Loading/Empty** - State messages

---

## Color Scheme

### Light Mode
```
Background: White/Light Gray
Text: Dark Gray/Black
Buttons: Blue (primary), Red (danger)
Accents: Green (success), Orange (warning)
```

### Dark Mode
```
Background: Dark Gray/Black
Text: Light Gray/White
Buttons: Light Blue (primary), Dark Red (danger)
Accents: Light Green (success), Light Orange (warning)
```

---

## Summary

**Complete UI flow with:**
- ✅ Search functionality
- ✅ Save books
- ✅ View library
- ✅ Update status & review
- ✅ Delete with confirmation
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Empty states
- ✅ Clear feedback

**All interactive elements shown and explained!** 🎨
