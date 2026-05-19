# HireInsight — Interview Feedback Consolidator

An AI-powered tool that consolidates feedback from 2–4 interviewers into a structured hiring recommendation report.

Built for the **Fresher Hackathon Assessment Challenge** — Challenge #4: Interview Feedback Consolidator.

---

## Features

- **4-step guided workflow** — Candidate Info → Interviewer Feedback → AI Analysis → Results
- **2 to 4 interviewers** — Tabbed interface, each with structured feedback fields
- **AI-powered consolidation** — Uses Claude API to extract strengths, concerns, risk areas, and panel alignment
- **Rich results report** — Hire score ring, verdict chip, alignment bar, next-round focus questions
- **Responsive UI** — Works on desktop and mobile

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18 + Vite                   |
| Styling   | Plain CSS (custom design system)  |
| AI        | Anthropic Claude API (claude-opus-4-5) |
| Fonts     | Syne + DM Sans (Google Fonts)     |

---

## Project Structure

```
interview-feedback-consolidator/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Top navigation bar
│   │   ├── StepIndicator.jsx     # 4-step progress bar
│   │   ├── CandidateForm.jsx     # Step 1 — candidate details
│   │   ├── InterviewerForm.jsx   # Step 2 — tabbed interviewer feedback
│   │   ├── LoadingScreen.jsx     # Step 3 — animated loading
│   │   └── ResultReport.jsx      # Step 4 — consolidated AI report
│   ├── hooks/
│   │   └── useAssessment.js      # Central state & logic hook
│   ├── services/
│   │   └── claudeApi.js          # Anthropic API integration
│   ├── App.jsx                   # Root component / router
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Full design system styles
├── index.html
├── vite.config.js
├── package.json
├── .env.example
└── README.md
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure your API key
Copy `.env.example` to `.env` and add your Anthropic API key:
```bash
cp .env.example .env
```
Then edit `.env`:
```
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
```
Get your key at: https://console.anthropic.com

### 3. Run the dev server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## How to Use

1. **Step 1 — Candidate Info**: Enter the candidate's name, role, level, department, and interview date.
2. **Step 2 — Interviewer Feedback**: Fill in feedback for each interviewer (minimum 2 required). Each form covers Technical Skills, Problem Solving, Communication, Cultural Fit, Overall Impression, and Individual Recommendation. Rate the candidate 1–10.
3. **Click "Generate AI Report"**: The AI analyses all inputs and produces a consolidated report.
4. **Step 4 — Results**: View the Hire Score, Final Recommendation, Panel Alignment, Strengths, Concerns, Risk Areas, and Next Round Focus questions.

---

## Output Report Sections

| Section                  | Description                                                  |
|--------------------------|--------------------------------------------------------------|
| Hire Score (1–10)        | Overall confidence score across all interviewers             |
| Final Recommendation     | Strong Hire / Hire / Hold / No Hire / Strong No Hire         |
| Panel Alignment          | How consistently interviewers evaluated the candidate        |
| Executive Summary        | 3–4 sentence narrative of the candidate                      |
| Strengths                | Key positives with interviewer frequency                     |
| Concerns                 | Issues flagged with Low / Medium / High severity             |
| Risk Areas               | Potential risks to flag for hiring manager                   |
| Next Round Focus         | Suggested probing questions for subsequent rounds            |
| Interviewer Panel        | Individual ratings and recommendations at a glance           |

---

## Notes

- The Anthropic API is called directly from the browser. This is suitable for hackathon/demo use. For production, route API calls through a backend server.
- At least **2 interviewers** must have their name and overall impression filled before the AI report can be generated.
- The `.env` file is gitignored. Never commit your API key.

---

## License

MIT — Free to use and modify.
