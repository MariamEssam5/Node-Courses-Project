# 📚Courses Management API

A robust, scalable, and fully functional RESTful API for managing a learning platform. Built with Node.js, Express, and MongoDB, this project follows the MVC (Model-View-Controller) architecture and emphasizes clean code practices, secure authentication, and scalable error handling.

---

## ✨ Features

* **User Authentication & Authorization:** Secure login and registration using `jsonwebtoken` (JWT) and `bcryptjs` for password hashing.
* **Role-Based Access Control (RBAC):** Three distinct user roles (`ADMIN`, `MANAGER`, `USER`) with specific route protections.
* **Image Uploads:** Profile avatar uploading and validation using `multer`.
* **Advanced Error Handling:** A centralized custom `AppError` class and an `asyncWrapper` to gracefully handle exceptions without repetitive `try-catch` blocks.
* **Data Validation:** Strict request body validation using `express-validator`.
* **Pagination:** Built-in pagination for fetching large lists of courses or users.
* **Standardized API Responses:** Consistent `{ status, data, message }` response format across all endpoints.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **Security & Utilities:** Bcryptjs, Cors, Dotenv
* **File Uploads:** Multer
* **Validation:** Express-Validator, Validator

---

## 📂 Project Architecture (MVC)

```text
├── controllers/      # Route handlers and business logic
├── data/             # Static or seed data
├── middleware/       # Custom middlewares (auth, validation, wrappers)
├── models/           # Mongoose schemas (Course, User)
├── routes/           # API route definitions
├── uploads/          # Stored user avatars
├── utils/            # Helper functions, standard status texts, and error classes
├── index.js          # Entry point and Express app setup
└── .env              # Environment variables
