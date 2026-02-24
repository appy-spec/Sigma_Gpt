# Sigma_Gpt

Sigma_Gpt is a Full-Stack AI Chat Application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and powered by the **OpenAI API**.

This project allows users to interact with an AI assistant in real-time, store chat history in MongoDB, and retrieve previous conversations seamlessly.

---

## 📌 Table of Contents

- Features
- Tech Stack
- Project Structure
- Installation Guide
- Environment Variables
- API Endpoints
- Database Schema
- How It Works
- Deployment
- Future Improvements
- Contributing
- Author
- License

---

# ✨ Features

- 💬 Real-time AI Chat
- 🧠 GPT-powered responses
- 🗄️ MongoDB chat storage
- 🔄 Persistent chat history
- ⚛️ Modern React UI (Vite)
- 📡 REST API using Express
- 🔐 Secure environment variables
- 📱 Fully responsive design

---

# 🛠️ Tech Stack

## 🔹 Frontend
- React.js
- Vite
- React Markdown
- React Spinners
- UUID

## 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- OpenAI SDK
- dotenv
- cors

---

# 📁 Project Structure

```
Sigma_Gpt/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
    ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Chat.jsx
│   │   ├── Chat.css
│   │   ├── ChatWindow.jsx
│   │   ├── ChatWindow.css
│   │   ├── index.css
│   │   ├── MyContext.jsx
│   │   ├── main.jsx
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   └── package.json
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/appy-spec/Sigma_Gpt.git
cd Sigma_Gpt
```

---

# 🔧 Backend Setup

### Step 1: Navigate to Backend

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

Create a `.env` file inside the `backend` folder and add:

```env
MONGODB_URL=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=8080
```

### Step 4: Start Backend Server

```bash
npm run start
```

Server will run on:

```
http://localhost:8080
```

---

# 💻 Frontend Setup

### Step 1: Navigate to Frontend

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# 🔑 Environment Variables

| Variable | Description |
|----------|------------|
| MONGODB_URL | MongoDB connection string |
| OPENAI_API_KEY | OpenAI API key |
| PORT | Backend server port |

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/chat | Send user message & receive AI response |
| GET | /api/chat | Retrieve chat history |

---

# 🗃️ Database Schema Example

```javascript
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: String,
  messages: [
    {
      role: String,
      content: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Chat", chatSchema);
```

---

# 🧠 How It Works

1. User sends a message from React frontend.
2. Frontend sends POST request to backend API.
3. Backend forwards message to OpenAI API.
4. OpenAI generates response.
5. Backend saves chat to MongoDB.
6. Response is returned to frontend and displayed.

---

# 🚀 Deployment Guide

## 🔹 Backend Deployment

Recommended platforms:
- Render
- Railway
- Fly.io
- Heroku

Steps:
1. Connect GitHub repository.
2. Add environment variables.
3. Connect MongoDB Atlas.
4. Deploy server.

---

## 🔹 Frontend Deployment

Recommended platforms:
- Vercel
- Netlify

Build command:

```bash
npm run build
```

Publish directory:

```
dist
```

---

# 🔮 Future Improvements

- 🔐 User authentication (JWT)
- 🌙 Dark/Light mode toggle
- 📂 Multiple chat sessions
- 🧾 Export chat as PDF
- 🗑️ Delete chat history option
- 🔄 Streaming AI responses

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 👨‍💻 Author

Rahul  
Full Stack MERN Developer  

---

# 📄 License

This project is open-source.  
You can add an MIT License if desired.

---

⭐ If you found this project helpful, please give it a star!
