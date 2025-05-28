# 🧠 Technical Documentation – SWAPI Fullstack Application

---

## 📌 Overview

This fullstack project is a Star Wars character explorer built using:

- **Backend:** Node.js, Express, TypeScript, Redis
- **Frontend:** React, Vite, TypeScript, RTK Query, SCSS
- **External API:** [https://swapi.tech](https://swapi.tech/)

Users can:

- Browse paginated characters
- Search by name
- View detailed character info
- Benefit from Redis-based caching for speed

---

Swapi-full-stack/
├── swapi-backend/               → Backend API built with Express and Redis              → API built with Express + Redis
│   ├── src/
│   │   ├── controllers/         → Route logic
│   │   ├── services/            → Business logic (fetching, caching, formatting)
│   │   ├── routes/              → Route declarations
│   │   ├── middlewares/         → Error handling.
│   │   ├── config/              → Redis setup, constants, axios config
│   │   ├── utils/               → Helpers like AppError, responseFormatter
│   │   ├── constants/           → Message strings and HTTP codes
│   │   ├── types/               → TypeScript interfaces and types
│   │   └── server.ts            → App entry point
├── swapi-frontend/              → Frontend built with React and Vite
│   ├── src/
│   │   ├── components/          → UI components
│   │   │   ├── atoms/           → Basic elements (Input, Button, etc.)
│   │   │   ├── molecules/       → Grouped atoms (SearchBar, Card)
│   │   │   ├── organisms/       → Complex UI sections (CharacterList, Layout)
│   │   ├── pages/               → Page-level views (Home, Details)
│   │   ├── libs/                → helper functions
│   │   ├── stores/              → Global state management (e.g., Zustand/Redux)
│   │   ├── styles/              → SCSS modules, variables
│   │   ├── assets/              → Images, icons, fonts
│   │   └── App.tsx              → Root component
│   └── .env




---

## 🔧 Backend API

Base URL: `http://localhost:8000/api/characters`

| **Method** | **Endpoint**                                     | **Description**                                      |
| ---------- | ------------------------------------------------ | ---------------------------------------------------- |
| `GET`      | `/:id`                                              | Fetch single character by id        |
| `GET`      | `/?limit={number}&page={number}&search={string}` | Fetch characters with pagination and optional search |

   
### 🧠 Caching Logic

- If cache miss: fetch from the SWAPI API, store in Redis
- Uses Redis with default TTL to improve performance
- If cache miss: fetch from SWAPI, store in Redis

---

## 🌐 Frontend Flow

1. Homepage fetches characters via backend
2. Pagination updates character list via query params
3. Search bar sends request to `/?limit={limit}&page={page}&search={search}`
4. Detail view hits `/:id` endpoint
5. RTK Query handles all API calls efficiently (using `VITE_API_BASE_URL`)

---

## 📦 Environment Variables

### Backend `.env`

```env
PORT=8000
BASE_URL=https://swapi.tech/api
REDIS_URL=redis://localhost:6379
Frontend .env
VITE_API_BASE_URL=http://localhost:8000/api/characters/
🎨 Styling
SCSS used for styling with modular structure

Responsive layout via media queries and flex/grid

Adaptive UI for all screen sizes (mobile to desktop)
Layer    Tech / Library
Backend    Express, TypeScript, Redis, Axios
Frontend    React, Vite, TypeScript, RTK Query
Styling    SCSS
Deployment    Localhost (for now)


🚧 Known Limitations
No unit tests implemented

Some edge cases (e.g., invalid API responses) handled generally

Deployed version pending (can be hosted on Render + Vercel)
Developer: Rabita Amin 
GitHub: Rabita1767 

