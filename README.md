# 💳 BankSync — Smart Banking Made Simple

BankSync is a **web application for managing bank accounts**. It allows users to:
✅ Sign up and sign in securely
✅ Connect multiple bank accounts
✅ View balances and transactions
✅ Manage user profile information

Built with **Node.js, Express, MongoDB, and vanilla frontend (HTML, CSS, JS)**, it provides a **secure 🔒, responsive 📱, and user-friendly 💡** banking experience.

🌍 **Live Demo:** [https://banksync.onrender.com](https://banksync.onrender.com)

---

## ✨ Features

### 🔑 User Authentication

* ✍️ Sign-up with **first name, last name, email, password**
* 🔐 Sign-in with **email + password** using **JWT tokens**

### 🏦 Bank Management

* ➕ Connect a bank account with:

  * 🏛 Bank Name
  * 🔢 Account Number
  * 📝 Account Type
  * 🔀 Routing Number
  * 💰 Initial Balance
* 📋 View all connected banks with **account details and balances**

### 👤 User Profile

* 📄 Displays user details:

  * Name
  * Email
  * Phone
  * Date of Birth
  * Address

### 📊 Dashboard

* 💵 Overview of **Total Balance, Expenses, and Savings**
* 🧾 Displays up to **4 recent transactions**

### 📱 Responsive Design

* 📲 Mobile-friendly interface
* 📂 Sidebar navigation
* 🌙☀️ Light/Dark mode toggle

---

## 🛠️ Tech Stack

### ⚙️ Backend

* 🟩 Node.js
* 🚀 Express.js
* 🍃 MongoDB Atlas (cloud database)
* 🔑 JSON Web Tokens (JWT)
* 🧂 bcrypt.js (for password hashing)

### 🎨 Frontend

* HTML, CSS, JavaScript
* 🎭 Font Awesome (icons)
* ✍️ Google Fonts (Inter)

### ☁️ Deployment

* Render (backend + frontend hosting)

### 📦 Dependencies

* express
* mongoose
* cors
* jsonwebtoken
* bcryptjs

---

## 📂 Project Structure

```
BankSync/
├── frontend/
│   ├── index.html         # Sign-in page
│   ├── sign-up.html       # Sign-up page
│   ├── dashboard.html     # Dashboard with stats and transactions
│   ├── connect-bank.html  # Form to add a bank
│   ├── my-banks.html      # List of connected banks
│   ├── profile.html       # User profile page
│   ├── js/
│   │   ├── main.js        # Topbar, sidebar, theme toggle
│   │   ├── auth.js        # Sign-in / sign-up logic
│   │   ├── banks.js       # Bank connection + listing
│   │   ├── dashboard.js   # Dashboard stats + transactions
│   │   ├── profile.js     # Profile data fetching
│   ├── styles/
│   │   ├── main.css       # Main styles
│   │   ├── responsive.css # Mobile responsiveness
├── server.js              # Express backend API
├── package.json           # Dependencies + scripts
├── .gitignore             # node_modules, .env
```

---

## 🚀 Getting Started

### ✅ Prerequisites

* ⚡ Node.js v14 or higher
* 🍃 MongoDB Atlas account
* 🔧 Git installed
* ☁️ Render account (for deployment)

### ⚙️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/banksync.git
cd banksync
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**
   Create a `.env` file in the root:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=mybanksync2025secret
PORT=3000
```

4. **Run Locally**

```bash
npm start
```

👉 Access at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing Features

* 📝 Sign up → [http://localhost:3000/frontend/sign-up.html](http://localhost:3000/frontend/sign-up.html)
* 🔑 Sign in → [http://localhost:3000](http://localhost:3000)
* ➕ Add a bank → [http://localhost:3000/frontend/connect-bank.html](http://localhost:3000/frontend/connect-bank.html)
* 🏦 View banks → [http://localhost:3000/frontend/my-banks.html](http://localhost:3000/frontend/my-banks.html)
* 👤 View profile → [http://localhost:3000/frontend/profile.html](http://localhost:3000/frontend/profile.html)

---

## ☁️ Deployment on Render

1. **Push to GitHub**

```bash
git init
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/banksync.git
git push -u origin main
```

2. **Create Web Service on Render**

* 🌐 Environment: Node
* ⚡ Build Command: `npm install`
* 🚀 Start Command: `npm start`
* 🔑 Environment Variables:

  * `MONGODB_URI`
  * `JWT_SECRET`
  * `PORT=3000`

3. ✅ Deploy & test → [https://banksync.onrender.com](https://banksync.onrender.com)

---

## 📡 API Endpoints

* `POST /api/signup` → 📝 Register new user
* `POST /api/signin` → 🔑 Login + JWT token
* `GET /api/profile` → 👤 Get user profile (JWT required)
* `POST /api/banks` → 🏦 Add bank (JWT required)
* `GET /api/banks` → 📋 List banks (JWT required)
* `GET /api/transactions` → 🧾 Recent transactions (JWT required)
* `GET /api/stats` → 📊 Dashboard stats (JWT required)

---

## 🛠️ Troubleshooting

⚠️ **Frontend not loading data**

* Open Console (F12 → Console) for errors
* Verify JWT token in Local Storage

⚠️ **MongoDB not connecting**

* Check `MONGODB_URI` in `.env`
* Ensure Atlas allows IP `0.0.0.0/0`

⚠️ **Invalid Token**

* Re-sign in to refresh JWT
* Ensure `JWT_SECRET` matches backend + Render

---

## 🤝 Contributing

👨‍💻 Steps to contribute:

1. Fork the repo
2. Create a new feature branch
3. Commit your changes
4. Open a Pull Request 🚀

---

## 📜 License

📄 Licensed under the **MIT License**

---

## 🙏 Acknowledgments

* 🟩 Node.js & 🚀 Express.js
* 🍃 MongoDB Atlas
* ☁️ Render
* 🎭 Font Awesome

---
