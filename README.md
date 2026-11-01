# 🚀 Agentify (CodePulse AI)
### 💙 One problem a day. Smarter every way.

[![Status](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/Babar-RM/Agentify)
[![Built With](https://img.shields.io/badge/built%20with-Next.js%2016%20%7C%20FastAPI%20%7C%20Gemini%20AI-blue)](https://github.com/Babar-RM/Agentify)

---

> **Agentify** is an agentic AI-powered learning platform that analyzes your GitHub repositories containing LeetCode solutions, detects your skill level and knowledge gaps, and automatically delivers one personalized daily LeetCode challenge straight to your email inbox.

---

## 🏗️ Architecture & Workflow

```
+-------------------------------------------------------------+
|                     Next.js 16 Frontend                     |
|  - Firebase Auth (Google / Email & Password)                |
|  - Analytics Dashboard: Streaks, Solved Problems, Charts    |
|  - Company-Specific Prep Roadmaps (Meta, Google, Amazon)    |
|  - Career Video Library & Curated Playlists                 |
+------------------------------+------------------------------+
                               | REST API (port 8000)
                               v
+-------------------------------------------------------------+
|                      FastAPI Backend                        |
|  - api_server.py: REST Endpoints (/api/analyze, /courses)   |
|  - daily_scheduler.py: 8:00 AM Daily LeetCode Email Job     |
|  - course_email_scheduler.py: 9:00 AM Company Problem Job   |
+---------------+------------------------------+--------------+
                |                              |
                v                              v
+-------------------------------+  +--------------------------+
|       Google Gemini AI        |  |   Neon Cloud PostgreSQL  |
|  - Analyzes GitHub solutions  |  |  - Stores solved code,   |
|  - Identifies weak topics     |  |    user streaks, daily   |
|  - Recommends next challenge  |  |    queues, course data   |
+-------------------------------+  +--------------------------+
                |
                v
+-------------------------------+
|         Brevo Email           |
|  - Delivers personalized      |
|    challenges to user inbox   |
+-------------------------------+
```

---

## 📁 Repository Structure

```
Agentify/
├── backend/                  # Python FastAPI Backend
│   ├── api_server.py         # REST API server
│   ├── config.py             # Config & credential loader
│   ├── course_service.py     # Neon DB course subscription service
│   ├── daily_scheduler.py    # 8 AM daily email challenge job
│   ├── course_email_scheduler.py # 9 AM company course email job
│   ├── email_service.py      # Brevo (Sendinblue) email dispatcher
│   ├── gemini_integration.py # Gemini AI code analysis engine
│   ├── leetcode_analyzer.py  # GitHub solution scraper
│   ├── main.py               # Multiprocessing orchestrator
│   ├── requirements.txt      # Python dependencies
│   ├── config.example.json   # Sanitized config template
│   └── run.py                # Standalone CLI analysis runner
├── frontend/                 # Next.js 16 App Router Frontend
│   ├── app/                  # Pages, context, and global styles
│   ├── components/           # UI components, dashboard, and auth
│   ├── lib/                  # Axios API client & Firebase auth
│   ├── public/               # Static assets & brand icons
│   ├── package.json          # Node dependencies
│   └── .env.example          # Sanitized frontend environment variables
├── docs/
│   └── rfcs/                 # Architecture RFCs & engineering roadmaps
├── .gitignore                # Root gitignore protecting all secrets
└── README.md
```

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Python 3.10+** (Tested on Python 3.12)
- **Node.js 18+** (Tested on Node.js v20)
- **PostgreSQL Database** (Neon.tech recommended)
- **Google Gemini API Key**
- **Brevo API Key** (for automated email dispatch)

---

### 2. Backend Setup (FastAPI)

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create your `config.json` by copying the template:
   ```bash
   cp config.example.json config.json
   ```
   Edit `config.json` with your credentials:
   - `gemini_api_key`
   - `database` (Neon PostgreSQL connection)
   - `email` (Brevo API key and sender email)
   - `github_token` (Optional, increases GitHub API rate limits)
4. Start the backend:
   ```bash
   # Full system (API server + daily schedulers)
   python main.py

   # Or API server only with auto-reload:
   uvicorn api_server:app --reload --port 8000
   ```
   Interactive API documentation will be available at: `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup (Next.js)

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📑 Architecture Specifications (RFCs)
- [RFC-0001: Git Architecture Restructuring & Clean Repository Initialization](./docs/rfcs/RFC-0001-git-architecture-and-monorepo-initialization.md)
- [RFC-0002: Codebase Restructuring, Deduplication & Conflict Resolution](./docs/rfcs/RFC-0002-codebase-restructuring-and-deduplication.md)
- [RFC-0003: Secrets Management & Security Hardening](./docs/rfcs/RFC-0003-secrets-management-and-security-hardening.md)
- [RFC-0004: Windows Console Encoding & Cross-Platform Logging Resilience](./docs/rfcs/RFC-0004-windows-utf8-logging-resilience.md)

---

## 👥 Authors
- **Babar Rahim** - [GitHub](https://github.com/Babar-RM) • [LinkedIn](https://www.linkedin.com/in/babar-rahim-b0882234b)
- **Hustler Crew**

## 📄 License
This project is licensed under the [MIT License](./backend/LICENSE).
