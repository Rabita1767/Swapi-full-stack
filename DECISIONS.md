# ⚙️ Technical & Design Decisions – SWAPI Fullstack App

This document outlines key decisions made during the development of the Star Wars Explorer App.

---

## 📦 Tech Stack Selection

### 1. **Backend – Node.js + Express + TypeScript**
- Chosen for simplicity, scalability, and strong ecosystem
- TypeScript ensures type safety and reduces runtime bugs
- Followed **MVC architecture**:
    - Controllers → Route handlers
    - Services → Business logic
    - Middlewares → Reusable logic
    - Types and constants for clear separation

### 2. **Redis for Caching**
- The SWAPI responses don’t change frequently → caching makes sense
- Redis improves performance by avoiding repetitive external API calls
- TTL not used to retain persistent cache across sessions

### 3. **Frontend – React + Vite + TypeScript**
- React provides component-based architecture, ideal for modular design
- Vite ensures a fast development environment with optimized build processes
- TypeScript enhances type safety and scalability for large component bases
- Followed **Atomic Design Pattern** to structure components into `atoms`, `molecules`, and `organisms` for better reusability and maintainability

### 4. **State Management – Redux Toolkit Query (RTK Query)**
- Simplifies data fetching and caching logic
- Automatically handles caching, invalidation, and background updates
- Reduces boilerplate compared to traditional Redux patterns
- Improves performance by minimizing redundant API calls
- Integrates seamlessly with TypeScript for type-safe queries

---

## 🎨 Styling Decisions

- Used **SCSS** to support modularity and maintainability
- Structure follows Atomic Design (`atoms`, `molecules`, `organisms`)
- Fully responsive design for screens from 340px to 1280px

---

## 📁 Folder Structure

- Backend follows **MVC architecture**:
  - Controllers → Route handlers
  - Services → Business logic
  - Middlewares → Reusable logic
  - Types and constants for clear separation
- Frontend follows **Atomic Design + feature-based structure**

---

## 🧠 Caching Logic

- Cached endpoints:
  - `GET /` → characters list with pagination
  - `GET /:id` → character details
- Redis keys formatted as:  
  - `getAll:page:${page}:limit:${limit}:search:${search || "none"}`
  - `character:${id}`

---

## 📡 API Integration

### API Integration – RTK Query

- Used **RTK Query** for API requests to simplify data fetching and caching logic
- Created reusable API slices to define endpoints and manage state
- Automatically handles caching, invalidation, and background updates
- Reduces boilerplate compared to Axios or traditional Redux patterns
- Integrates seamlessly with TypeScript for type-safe queries
- Frontend uses `.env` variable to switch between environments easily

---

