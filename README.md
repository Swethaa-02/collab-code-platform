# 💻 Collaborative Coding Platform – Frontend

This is the **React-based frontend** for the Collaborative Coding Platform.  
It provides the user interface for real-time collaborative coding with features like **syntax highlighting**, **room-based collaboration**, and **live updates**.

---

## 🚀 Features
- **React.js** frontend with functional components
- **CodeMirror 6** for syntax-highlighted editor
- **Socket.io-client** for real-time sync with backend
- Room-based collaboration (multiple rooms supported)
- Smooth and responsive UI
- Dynamic username and room joining

---

## 🛠️ Tech Stack
- **React.js**
- **CodeMirror 6**
- **Socket.io-client**
- **React Router DOM**
- **CSS / TailwindCSS** (UI styling)
- **Vite** (React build tool)

---

## 📂 Folder Structure
client/
│── public/
│── src/
│ ├── components/
│ │ ├── Editor.jsx
│ │ ├── Sidebar.jsx
│ │ ├── RoomJoin.jsx
│ │ └── Navbar.jsx
│ ├── pages/
│ │ ├── HomePage.jsx
│ │ └── EditorPage.jsx
│ ├── App.jsx
│ ├── index.jsx
│ └── styles.css
│── package.json

---

 ## ⚙️ Installation & Setup

1️⃣ Navigate to the client folder
cd client

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm run dev

By default, the app runs at:
http://localhost:5173

---

## 🔗 Environment Variables
Create a .env file inside client/ and add:
VITE_BACKEND_URL=http://localhost:5000

---

## 📜 License
This project is licensed under the MIT License.
