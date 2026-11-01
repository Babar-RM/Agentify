# 🚀 CodePulse AI  
### 💙 One problem a day. Smarter every way.

[![Status](https://img.shields.io/badge/status-alpha-orange)](https://github.com/ArsalanTheCoder/CodePulse-AI) [![Hackathon](https://img.shields.io/badge/DevLaunch-2026-blue)](https://devlaunch.example/) [![Built With](https://img.shields.io/badge/built%20with-Next.js%20%7C%20FastAPI-lightgrey)](https://vercel.com/)

---

> **CodePulse AI** is an AI-powered web platform that analyzes your GitHub activity and delivers one personalized LeetCode problem to your inbox every day.  
> Designed to build consistent coding habits through intelligent recommendations, progress analytics, quizzes, and community leaderboards.

---

## ✨ Quick Links

| **📺 Watch Video Demo** | **📑 View Presentation** |
| :---: | :---: |
| [![Watch Video Demo](https://github.com/user-attachments/assets/df6a6f0d-d4f2-44c8-93a4-fb999ac994e0)](https://drive.google.com/file/d/18J3i4-Qkw8MrgHXSiwncJAc6jkQSr4LY/view?usp=sharing) | [![View Presentation Slides](https://github.com/user-attachments/assets/5f2745d6-cd5f-478e-930c-591d26673f5e)](https://gamma.app/docs/CodePulse-AI-4aav36qz5fxwxqg) |
| *Click image to watch video* | *Click image to open slides* |

- **Repository:** [https://github.com/ArsalanTheCoder/CodePulse-AI](https://github.com/ArsalanTheCoder/CodePulse-AI.git)

---

## 🔥 Problem (TL;DR)
Developers struggle to maintain daily, structured coding practice because:
- Practice is often random and unstructured  
- Choosing the right problems is time-consuming  
- There is no automated accountability or visible progress

---

## 💡 Our Solution
**CodePulse AI** uses an *agentic AI* pipeline to:
- Analyze your GitHub repositories for languages, activity, and problem patterns  
- Infer your skill level and knowledge gaps  
- Send **one personalized LeetCode problem daily** via email  
- Track streaks, performance, and motivate through quizzes & leaderboards

---

## 📦 System Diagram
> The diagram below visualizes the core system flow.  

<p align="center">
  <img src="https://github.com/user-attachments/assets/8e8c2af8-6fbc-4b06-93a5-86a46fed0d0c" alt="System Architecture Diagram - CodePulse AI" width="900"/>
</p>

---

## 🧩 Key Features (At a glance)
- 🤖 **Agentic AI**: Autonomous repo analysis & recommendation engine  
- 📩 **Automated Emails**: Welcome email + daily LeetCode challenge delivery (Brevo)  
- 📊 **Analytics Dashboard**: Streaks, weekly/monthly charts, difficulty distribution  
- 🧪 **Quizzes & Gamification**: Topic quizzes, points, badges  
- 🏆 **Leaderboards**: Weekly & global rankings to boost motivation  
- 🎓 **Career Content**: Embedded iCodeGuru career guidance videos

---

## 🛠️ Tech Stack (what we used)
- **Frontend:** Next.js, Tailwind CSS  
- **Backend:** FastAPI (Python)  
- **AI / Analysis:** Google Gemini API (prompt + agentic workflows)  
- **Auth:** Firebase Authentication  
- **Database:** Neon MySQL  
- **Email:** Brevo (Sendinblue) API  
- **Integrations:** GitHub API (Personal Access Token)

---

## 👥 Meet Team Hustler Crew

| Team Member | Contact & Profiles |
| :--- | :--- |
| **Mohammad Arsalan** | 📧 mohammad.arsalan.dev@gmail.com<br>🔗 [LinkedIn Profile](https://www.linkedin.com/in/mohammad-arsalan-83631b2aa) |
| **Muhammad Ahmed** | 📧 ahmednadeemarain.75@gmail.com<br>🔗 [LinkedIn Profile](https://www.linkedin.com/in/muhammad-ahmed-445180250/) |
| **Babar Rahim** | 📧 babarrahim528@gmail.com<br>🔗 [LinkedIn Profile](https://www.linkedin.com/in/babar-rahim-b0882234b) |
| **Husnain Aslam** | 📧 arainhasnain817@gmail.com<br>🔗 [LinkedIn Profile](https://linkedin.com/in/husnainaslam1/) |

<br/>

**📫 Contact Us**
- **Email:** mohammad.arsalan.dev@gmail.com
- **Email:** ahmednadeemarain.75@gmail.com
- **WhatsApp:** 0311-0309096

---

## 🚀 How to Run (Quick start)

```bash
# Clone the repository
git clone [https://github.com/ArsalanTheCoder/CodePulse-AI.git](https://github.com/ArsalanTheCoder/CodePulse-AI.git)

# frontend (Next.js)
cd frontend
npm install
npm run dev

# backend (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Note: add .env with keys:
# - FIREBASE config
# - GITHUB_PERSONAL_ACCESS_TOKEN
# - BREVO_API_KEY
# - GEMINI_API_KEY
# - NEON_MYSQL connection string
