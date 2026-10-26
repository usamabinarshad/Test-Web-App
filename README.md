# Quiz Web App

A full-stack test-taking application built with Next.js (TypeScript) and a layered Node.js / Express microservice backend.

## Features

- **Question List**: 7 multiple-choice questions with 5 options each.
- **Server-Side Answer Validation**: Correct answers are kept strictly on the server and never exposed in the initial questions payload.
- **Immediate Feedback**: Selecting an option checks against the server and highlights whether the choice is correct or incorrect.
- **Question Filters**: Filter questions by `All`, `Unanswered`, `Correct`, and `Wrong` with real-time count badges.
- **Score Tracking**: Displays live score and progress counter (`X of 7 correct · Y of 7 answered`).
- **Progress Persistence**: Answers and progress survive page reloads using local storage, with an option to reset.
- **Loading & Error States**: Graceful UI handling for pending network requests and server connectivity errors.
- **Comprehensive Test Coverage**: Unit and integration test suites for both frontend components/hooks and backend service/API endpoints (>90% coverage).

---

## Architecture

```
.
├── src/                      # Next.js Frontend
│   ├── app/                  # App router pages and layout
│   ├── components/           # Reusable UI components (QuestionCard, FilterBar)
│   ├── hooks/                # Custom React hooks (useLocalStorage)
│   ├── lib/                  # API client service
│   ├── types/                # Shared frontend types
│   └── __tests__/            # Frontend test suites (Jest + React Testing Library)
│
└── backend/                  # Express Microservice
    └── src/
        ├── config/           # Environment and server configuration
        ├── controllers/      # Request handlers
        ├── data/             # In-memory question data store
        ├── middleware/       # Validation and error handling middleware
        ├── routes/           # Express route definitions
        ├── services/         # Business logic layer
        ├── types/            # TypeScript interfaces and DTOs
        ├── utils/            # Standardized API response utilities
        └── __tests__/        # Backend test suites (Jest + Supertest)
```

---

## Getting Started

### 1. Prerequisites

- Node.js (v20+ recommended)
- npm

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend API runs on `http://localhost:4000`.

### 3. Frontend Setup

From the root directory:

```bash
npm install
npm run dev
```

The frontend application runs on `http://localhost:3000`.

---

## Running Tests

### Run Both Frontend & Backend Tests
From the root directory:
```bash
npm run test:all
```

### Run Frontend Tests
```bash
npm test
```

### Run Backend Tests
```bash
npm run test:backend
```

### Test Coverage Reports
To generate and view interactive HTML coverage reports:
```bash
# Frontend coverage
npm run test:coverage

# Backend coverage
npm run test:backend:coverage
```
Reports will be generated in `coverage/lcov-report/index.html` and `backend/coverage/lcov-report/index.html`.
