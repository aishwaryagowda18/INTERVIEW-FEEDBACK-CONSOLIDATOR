# 🎯 HireInsight – Interview Feedback Consolidator

A smart AI-powered interview feedback consolidation platform designed to streamline the recruitment process by collecting, analyzing, and consolidating candidate interview feedback from multiple interview rounds into a single intelligent evaluation system.

## 📌 Project Overview

**HireInsight – Interview Feedback Consolidator** is a modern full-stack web application that helps organizations efficiently evaluate candidates by consolidating feedback from multiple interviewers such as technical, managerial, HR, and culture-fit rounds.

The platform eliminates manual bias, scattered feedback, and inconsistent hiring decisions by using **AI-powered analysis** to generate structured summaries, weighted scoring, and final hiring recommendations.

This system helps recruiters and hiring managers make faster, data-driven, and more accurate hiring decisions.

---

## 🚀 Features

### ✅ Multi-Round Interview Feedback Collection

* Technical Round Evaluation
* Managerial Round Evaluation
* HR Round Assessment
* Culture Fit Evaluation
* Interviewer Comments and Ratings

### ✅ AI-Powered Feedback Analysis

* Intelligent feedback summarization
* Automated sentiment analysis
* Candidate performance evaluation
* Smart recommendation generation
* Strength and weakness identification

### ✅ Candidate Evaluation Dashboard

* Professional UI dashboard
* Candidate score visualization
* Weighted performance calculation
* Overall candidate comparison
* Real-time evaluation tracking

### ✅ Hiring Recommendation Engine

* Final hiring recommendation
* Strong Hire / Hire / Hold / Reject classification
* Weighted score calculation
* Decision support system

### ✅ Modern User Interface

* Premium and responsive UI design
* Clean dashboard visualization
* Interactive navigation system
* Mobile-friendly experience

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Python
* FastAPI
* Uvicorn Server

### AI Integration

* Groq API
* Large Language Model Integration
* AI-based Feedback Analysis

### Development Tools

* VS Code
* Git
* GitHub

---

## 🏗️ System Architecture

```text
User Input
    ↓
Frontend (React + Vite)
    ↓
FastAPI Backend
    ↓
Groq AI Processing
    ↓
Feedback Analysis
    ↓
Weighted Score Calculation
    ↓
Final Hiring Recommendation
    ↓
Dashboard Visualization
```

---

## 📂 Project Structure

```text
HireInsight-InterviewFeedbackConsolidator/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── API Logic
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── UI Components
│
├── node_modules/
├── package.json
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/aishwaryagowda18/INTERVIEW-FEEDBACK-CONSOLIDATOR.git
```

```bash
cd INTERVIEW-FEEDBACK-CONSOLIDATOR
```

---

### 2️⃣ Backend Setup

Move to backend folder:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

#### Windows (PowerShell)

```bash
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
python -m uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup

Move to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder and add:

```env
GROQ_API_KEY=your_api_key_here
```

⚠️ **Important:** Never upload your `.env` file to GitHub.

---

## 📊 Workflow of the System

1. Interviewer enters candidate feedback.
2. Feedback from multiple rounds gets collected.
3. AI model analyzes candidate performance.
4. Weighted score is calculated.
5. Strengths and weaknesses are identified.
6. Final hiring recommendation is generated.
7. Results are displayed on the dashboard.

---

## 💡 Use Cases

* Recruitment Management
* HR Interview Analysis
* Campus Hiring Evaluation
* Candidate Screening
* Multi-Interviewer Feedback Consolidation
* Hiring Decision Support

---

## 📈 Future Enhancements

* Candidate Ranking System
* Resume Parsing
* PDF Report Generation
* Email Notifications
* Authentication & Role Management
* Database Integration
* Analytics Dashboard
* Candidate Comparison Charts

---

## 🎯 Project Objectives

* Reduce hiring bias
* Improve decision-making accuracy
* Consolidate interview feedback
* Automate candidate evaluation
* Enhance recruitment efficiency

---

## 👩‍💻 Developed By

**Aishwarya A**
Bachelor of Engineering – Computer Science (Data Science)
Python Full Stack Developer | AI & Data Science Enthusiast

GitHub: [https://github.com/aishwaryagowda18](https://github.com/aishwaryagowda18)

---

## ⭐ Support

If you like this project, consider giving it a **star ⭐** on GitHub.

---

## 📜 License

This project is developed for **educational and learning purposes**.
