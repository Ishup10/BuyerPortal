# Real Estate Buyer Portal - Full Stack System

A complete real-estate buyer solution featuring secure authentication, a dynamic property catalog, and a personalized favorites dashboard.

## 📁 Project Structure
- **`/buyer-portal-backend`**: Node.js & Express API with SQLite3 database.
- **`/frontend`**: React.js application using Axios for API communication.

---

## 🚀 How to Run the Application

### 1. Backend Setup (API & Database)
1. Open a terminal in the `buyer-portal-backend` folder.
2. Install dependencies:
   ```bash
   npm install
   npm start
   env for backend:PORT=5000
JWT_SECRET=ab8b738b479c0ff6de40b839b88400c0196cef9baaca42b2e3ac5241b93d68a461f1a0fdccd5a4237ed439c39d6466be9d847e5cc781bc07c721ee18a7c67250
env for frontend:REACT_APP_API_URL=http://localhost:5000/api

### 2. Frontend Setup (React & Ui)
Open a new terminal in the frontend folder.

Install dependencies:
npm install
npm start
The app will open at http://localhost:3000.

Key Features & Implementation
Authentication: JWT (JSON Web Tokens) with Bcrypt hashing for secure login.

CRUD Operations: for property (Add, Read) and 
CRUD Operations: for favourite(ADD,Dekete)



UX Thinking: Integrated clear success/error messages for all user actions.

Register a new account.

Login to access the dashboard.

Add a new property using the admin form.

Favorite that property to see it appear in your personal list.

remove the property from favourite

Tech Stack
Frontend: React.js, Axios,  CSS 
Backend: Node.js, Express.js, JWT Authentication, Bcrypt
Database: SQLite3
Others: Nodemon, dotenv, CORS