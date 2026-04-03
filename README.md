Real Estate Buyer Portal – Full Stack Application
A complete full-stack real estate platform that enables users to browse properties, manage favorites, and securely interact with the system through authentication.
📁 Project Structure
buyer-portal/
│
├── buyer-portal-backend/   # Node.js + Express API with SQLite3
└── frontend/               # React.js application (UI)
🚀 Getting Started
1️⃣ Backend Setup (API & Database)

Navigate to the backend directory:
cd buyer-portal-backend
npm install
Create a .env file in the backend root:
PORT=5000
JWT_SECRET=your_super_secure_jwt_secret
Start the backend server:
npm start
The API will run at:http://localhost:5000

Frontend Setup (React UI)
Open a new terminal and navigate to the frontend directory:
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000/api
Start the React app:
npm start
The application will open at:http://localhost:3000

🔐 Features
✅ Authentication
Secure user registration and login
Password hashing using Bcrypt
Token-based authentication using JWT (JSON Web Tokens)

🏘️ Property Management
Add new properties (Admin functionality)
View property listings

❤️ Favorites System
Add properties to favorites
Remove properties from favorites
Personalized favorites dashboard

🎯 User Experience
Clear success and error feedback
Smooth interaction between frontend and backend
Clean and intuitive UI

🧪 How to Use
Register a new account
Log in to access your dashboard
Add a property (admin feature)
Browse available properties
Add properties to your favorites
View and manage your favorite listings

🛠️ Tech Stack
Frontend
React.js
Axios
CSS
Backend
Node.js
Express.js
JWT Authentication
Bcrypt
Database
SQLite3
Other Tools
Nodemon
dotenv
CORS

⚠️ Security Note
Never expose your real JWT_SECRET in public repositories
Always use environment variables for sensitive data

📌 Future Improvements
Role-based access control (Admin vs User)
Property update & delete functionality
Image uploads for properties
Pagination & filtering
Deployment (Docker / Cloud)
