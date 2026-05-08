# Expense Tracker

A full-stack web app to track personal expenses — built with React, Node.js, and MongoDB.

Users can sign up, log in, add expenses by category, see their total spending, and delete entries. Each user only sees their own data.

---

## Tech Stack

**Frontend:** React, React Router, Axios  
**Backend:** Node.js, Express  
**Database:** MongoDB Atlas  
**Auth:** JWT (JSON Web Tokens), bcrypt

---

## Features

- Register and login with hashed passwords
- Add expenses with title, amount, and category (Food, Transport, Shopping, etc.)
- See total amount spent at a glance
- Delete individual expenses
- Each user's data is private — protected by JWT on every API route

---

## Project Structure

```
expense-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── expenses.js
│   └── server.js
└── frontend/
    └── src/
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Dashboard.jsx
        └── App.jsx
```

---

## Running Locally

**Backend**
```bash
cd backend
npm install
# create a .env file with MONGO_URI, JWT_SECRET, PORT
node server.js
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`, API at `http://localhost:5000`.

---

## API Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /api/auth/register | Create account | No |
| POST | /api/auth/login | Login | No |
| GET | /api/expenses | Get user's expenses | Yes |
| POST | /api/expenses | Add expense | Yes |
| DELETE | /api/expenses/:id | Delete expense | Yes |

---

## What I Learned

This was my first full-stack project. Key things I figured out along the way:

- How JWT auth works end to end — token generation, storage, and verification on protected routes
- Connecting a React frontend to an Express backend with CORS
- Structuring a REST API with separate route and model files
- Using MongoDB Atlas as a cloud database instead of running it locally
