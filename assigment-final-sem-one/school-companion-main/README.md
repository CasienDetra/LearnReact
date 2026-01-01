# School Student Management System

A full-featured CRUD application for managing student records, built with React (Vite), Chakra UI, Zustand, and JSON Server.

## Tech Stack

- **React + Vite** - Fast development and build
- **Chakra UI** - Component library (no Tailwind CSS)
- **Zustand** - Lightweight state management
- **JSON Server** - Mock REST API backend
- **Axios** - HTTP client

## Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete students
- ✅ **Search** - Filter students by name
- ✅ **Filters** - Filter by Department, Major, Year, Province
- ✅ **Pagination** - Client-side pagination with page size selector
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Modal Forms** - Chakra UI modals for create/edit
- ✅ **Delete Confirmation** - AlertDialog for safe deletion
- ✅ **Loading States** - Spinner while fetching data
- ✅ **Error Handling** - Alert messages for errors

## Project Structure

```
src/
├── components/
│   ├── StudentTable.jsx    # Student data table with actions
│   ├── StudentForm.jsx     # Create/Edit form modal
│   ├── SearchBar.jsx       # Search by name
│   ├── FilterPanel.jsx     # Filter dropdowns
│   └── Pagination.jsx      # Page navigation
├── store/
│   └── studentStore.js     # Zustand state management
├── services/
│   └── studentApi.js       # Axios API service
├── App.jsx                 # Main application
├── main.jsx                # Entry point
└── index.css               # Minimal global styles
db.json                     # Sample data for JSON Server
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install JSON Server and concurrently:
   ```bash
   npm install json-server concurrently --save-dev
   ```

### Running the Application

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "server": "json-server --watch db.json --port 3001",
    "start": "concurrently \"npm run dev\" \"npm run server\""
  }
}
```

**Run both frontend and backend together:**

```bash
npm run start
```

**Or run separately:**

Terminal 1 - Start JSON Server:

```bash
npm run server
```

Terminal 2 - Start Vite dev server:

```bash
npm run dev
```

### API Endpoints

The JSON Server provides these RESTful endpoints at `http://localhost:3001`:

- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

## Student Data Model

```javascript
{
  "id": number,
  "student_name": string,
  "BOD": string,           // Date of Birth (YYYY-MM-DD)
  "Department": string,
  "Major": string,
  "Year": number,          // 1-6
  "class": string,
  "Province": string
}
```

## State Management (Zustand)

The store manages:

- Student list data
- Loading and error states
- Search query
- Filter states (department, major, year, province)
- Pagination (current page, page size)

## Note

This project uses **only Chakra UI** for styling - no Tailwind CSS.
