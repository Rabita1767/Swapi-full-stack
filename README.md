# SWAPI Fullstack App 🚀

A fullstack Star Wars character explorer built with:

- ⚙️ **Node.js**, **Express**, **TypeScript**, **Redis** (Backend)
- 🌐 **React**, **Vite**, **TypeScript**, **SCSS** **RTK Query**(Frontend)

---

## 📁 Project Structure

Swapi-full-stack/
├── swapi-backend/ → Express + TypeScript + Redis 
├── swapi-frontend/ → React + Vite UI + RTK Query

## 🔧 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Rabita1767/Swapi-full-stack.git
cd Swapi-full-stack
```

### 2️⃣ Backend Setup (/backend)

```bash
cd swapi-backend
npm install
```

⚠️ Note: Make sure Redis is installed and running locally on port 6379
(You can start it by running redis-server)

Create a `.env` file in the "swapi-backend" folder:

```env
PORT=8000
BASE_URL='https://swapi.tech/api'
```

Run the backend server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup (/swapi-frontend)

```bash
cd ../swapi-frontend
npm install
```

Create a `.env` file in the "swapi-frontend" folder:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/characters/
```

Run the frontend:

```bash
npm run dev
```

Then open 👉 [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌟 Features

- 🌌 Fetch paginated list of Star Wars characters
- 🔍 Search characters by name
- 📄 View character details by ID
- ⚡️ Redis caching for faster backend responses
- ❌ Gracefully handles 404, loading, and error states
- 🎨 Styled using **SCSS** with modular structure
- 🧩 Structured via **Atomic Design** (atoms, molecules, organisms)
- 🔄 Integrated **RTK Query** for efficient API data fetching and caching
- 🌀 Smooth UI animations using **Framer Motion**
- 🔔 Toast notifications powered by **React Toastify**
- 📱 Fully responsive across all screen sizes (340px–1280px)
- 🖼️ Optimized layout for mobile, tablet, and desktop devices
- 🔧 Environment-based config via `.env` files


---

## 🛠️ Tech Stack

| Layer    | Tech Used                             |
| -------- | ------------------------------------- |
| Backend  | Node.js, Express, TypeScript, Redis   |
| Frontend | React, Vite, TypeScript  , RTK Query             |
| Styling  | SCSS (modular components)             |
| API      | [SWAPI.tech](https://swapi.tech/api)  |

---

## 🧪 Testing

No automated unit tests added yet.  
✅ All core features were manually tested:

- List characters (with pagination)
- View character details
- Search characters by name
- 404,loading and empty state handling
- Redis cache hits and misses

---

## 👩‍💻 Author

**Rabita Amin**  
Fullstack Developer | MERN | Redis | Clean Code Enthusiast  
