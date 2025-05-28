# ✅ QA / Test Plan – SWAPI Fullstack App

This document outlines the manual testing efforts and key test cases used to validate the app.

---

## 🧪 What Was Tested

| Feature                      | Status  | Notes                        |
|-----------------------------|---------|------------------------------|
| Fetch all characters        | ✅ Pass | With and without pagination |
| Pagination (next/prev)      | ✅ Pass | Tested various page numbers |
| Search by name              | ✅ Pass | Case-insensitive, partial   |
| View character details      | ✅ Pass | Handled invalid IDs         |
| Empty states (no results)   | ✅ Pass | Search returns "not found"  |
| Loading indicators          | ✅ Pass | On all fetch operations     |
| Redis caching               | ✅ Pass | Confirmed hits/misses       |
| 404 and invalid routes      | ✅ Pass | Custom error messages shown |
| Mobile responsiveness       | ✅ Pass | Tested 340px–1280px widths  |

---

## 🧰 Tools Used

- **Postman** → for testing backend routes
- **Browser DevTools** → for testing responsiveness and inspecting frontend behavior
- **Redis CLI** → to monitor and flush cache when needed

---

## 🧪 Future Improvements

- Add Jest + React Testing Library for unit tests
- Use Supertest for backend endpoint testing
- Automate smoke testing and regression checks
