# 🧠 MindCare — ML-based Mental Health Risk Assessment System

An AI-powered web application that evaluates students' mental health risk levels using a questionnaire and provides personalized recommendations via OpenAI GPT.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Default Admin Credentials](#default-admin-credentials)
- [Screenshots](#screenshots)

---

## ✨ Features

### Student Features
- **User Authentication** — Register, login, logout with JWT & bcrypt
- **Mental Health Questionnaire** — 13-question assessment (sleep, stress, mood, etc.)
- **GPT-Powered Risk Prediction** — AI analyzes responses and returns risk level (Low/Moderate/High)
- **Personalized Recommendations** — Tailored well-being suggestions based on assessment
- **Student Dashboard** — View latest results, history, progress charts
- **Progress Tracking** — Stress trend and sleep vs stress charts (Chart.js)
- **AI Chatbot** — Built-in mental health chat assistant
- **Email Alerts** — Automatic email with resources for high-risk assessments
- **Dark Mode** — Toggle dark/light theme

### Admin Features
- **Admin Dashboard** — Anonymized analytics (no student names shown)
- **Statistics** — Total users, assessments, risk distribution
- **Charts** — Risk pie chart, stress trends, assessment frequency, monthly trends
- **Report Generation** — Export weekly/monthly reports as PDF or CSV

---

## 🛠 Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Frontend       | HTML5, JavaScript, Bootstrap 5, Tailwind CSS, Chart.js, Axios |
| Backend        | Node.js, Express.js                |
| Database       | MongoDB (Mongoose)                  |
| Authentication | JWT, bcrypt                         |
| AI Service     | OpenAI GPT API (with fallback)      |
| Other          | nodemailer, pdfkit, json2csv, helmet, cors, morgan |

---

## 📁 Project Structure

```
MentalHealth/
├── backend/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── auth/           # Authentication (model, service, controller, route)
│   │   │   ├── assessment/     # Assessment (model, service, controller, route)
│   │   │   ├── prediction/     # Prediction & results (model, service, controller, route)
│   │   │   └── admin/          # Admin analytics (service, controller, route)
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   └── adminMiddleware.js
│   │   └── services/
│   │       ├── gptService.js   # OpenAI GPT integration
│   │       ├── emailService.js # Nodemailer email alerts
│   │       └── reportService.js # PDF & CSV report generation
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── env.js              # Environment variables
│   ├── utils/
│   │   └── generateReport.js
│   ├── server.js               # Express server entry point
│   ├── seed.js                 # Admin user seeder
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── index.html              # Landing page
│   ├── css/
│   │   └── style.css           # Custom styles + dark mode
│   ├── js/
│   │   ├── api.js              # Axios API client
│   │   ├── auth.js             # Auth utilities & navbar
│   │   ├── dashboard.js        # Dashboard logic & chatbot
│   │   ├── assessment.js       # Assessment form logic
│   │   ├── charts.js           # Chart.js rendering
│   │   └── admin.js            # Admin dashboard logic
│   ├── pages/
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── dashboard.html
│   │   ├── assessment.html
│   │   ├── results.html
│   │   └── admin.html
│   └── components/
│       ├── navbar.html
│       ├── questionnaire.html
│       ├── resultCard.html
│       └── recommendationPanel.html
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (local or Atlas URI)
- **OpenAI API Key** (optional — fallback rule-based analysis works without it)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd MentalHealth
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Seed default admin user**
   ```bash
   npm run seed
   ```

5. **Start the backend server**
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

6. **Open the frontend**
   - Navigate to `http://localhost:5000` in your browser
   - The backend serves the frontend statically

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mental_health
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

| Variable       | Description                                      |
|---------------|--------------------------------------------------|
| PORT          | Server port (default: 5000)                      |
| MONGO_URI     | MongoDB connection string                        |
| JWT_SECRET    | Secret key for JWT tokens                        |
| OPENAI_API_KEY| OpenAI API key (optional, fallback available)    |
| EMAIL_USER    | Gmail address for sending email alerts           |
| EMAIL_PASS    | Gmail App Password for nodemailer                |

> **Note:** If no OpenAI API key is provided, the system uses a built-in rule-based fallback for risk assessment.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint             | Description        | Auth |
|--------|---------------------|--------------------|------|
| POST   | `/api/auth/register` | Register new user  | No   |
| POST   | `/api/auth/login`    | Login              | No   |
| GET    | `/api/auth/profile`  | Get user profile   | Yes  |

### Assessment
| Method | Endpoint                | Description           | Auth |
|--------|------------------------|-----------------------|------|
| POST   | `/api/assessment`       | Submit assessment     | Yes  |
| GET    | `/api/assessment/history` | Get assessment history | Yes |

### Prediction
| Method | Endpoint            | Description               | Auth |
|--------|--------------------|-----------------------------|------|
| POST   | `/api/predict`      | Run GPT risk prediction    | Yes  |
| GET    | `/api/predict/results` | Get all results          | Yes  |
| GET    | `/api/predict/latest`  | Get latest result        | Yes  |

### Admin
| Method | Endpoint           | Description           | Auth  |
|--------|-------------------|-----------------------|-------|
| GET    | `/api/admin/stats`  | Get anonymized stats  | Admin |
| GET    | `/api/admin/reports`| Download report (PDF/CSV) | Admin |

---

## 👤 Default Admin Credentials

After running `npm run seed`:

| Email                    | Password   |
|--------------------------|------------|
| admin@mentalhealth.com   | admin123   |

---

## 🎨 UI Features

- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Mode** — Toggle via navbar button
- **Modern Dashboard** — Card-based layout with gradient accents
- **Interactive Charts** — Chart.js with stress trends, risk distribution, sleep analysis
- **AI Chatbot** — Floating chat button with mental health tips
- **Smooth Animations** — Hover effects, transitions, loading states

---

## 📊 GPT Integration

The system sends questionnaire data to OpenAI's GPT API with this prompt structure:

```
"Analyze the student's responses and classify the risk level as:
Low Risk / Moderate Risk / High Risk
Also generate helpful well-being suggestions."
```

GPT returns a structured JSON response:
```json
{
  "risk_level": "Moderate",
  "recommendations": [
    "Improve your sleep schedule",
    "Try stress management techniques",
    ...
  ]
}
```

If the API is unavailable, a **rule-based fallback** calculates risk from the questionnaire scores.

---

## 📄 License

This project is for educational purposes. Not a substitute for professional mental health advice.
