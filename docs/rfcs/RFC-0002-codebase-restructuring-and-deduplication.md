# RFC-0002: Codebase Restructuring, Deduplication & Conflict Resolution

- **RFC ID:** RFC-0002
- **Title:** Codebase Restructuring, Deduplication & Conflict Resolution
- **Author:** Antigravity Pair Programmer
- **Status:** Implemented
- **Priority:** High (P0)
- **Created Date:** 2026-11-01
- **Target Component:** Directory Structure, Frontend & Backend Organization

---

## 1. Summary
This RFC defines the reorganization of the repository into a clean monorepo with distinct `frontend/` and `backend/` directories. It purges redundant Next.js files duplicated within the backend folder, resolves active Git merge conflict markers in configuration files, removes dead scripts, and standardizes workspace naming.

---

## 2. Problem Statement
The current directory hierarchy suffers from significant architectural drift:

1. **Frontend Duplication in Backend Directory**:
   - `LeetCodeAgent_Backend` contains Python backend files alongside a full duplication of the Next.js frontend (`app/`, `components/`, `lib/`, `public/`, `next.config.js`, `tailwind.config.js`, etc.).
   - Meanwhile, `agentify-leetcode-agent-main` serves as the primary frontend where `node_modules` is installed and verified.
2. **Active Git Conflict Markers**:
   - `LeetCodeAgent_Backend/package.json` contains uncommitted conflict markers:
     ```json
     <<<<<<< HEAD
     =======
         "axios": "^1.13.2",
     >>>>>>> 39a72c7fb6c1db0392a1e3c7ea28e1acadce5c01
     ```
   - `LeetCodeAgent_Backend/.gitignore` contains uncommitted conflict markers across lines 1–6 and 48.
3. **Dead and Deprecated Files**:
   - `LeetCodeAgent_Backend/python.py` attempts to read a nonexistent `database_migration.sql` file and execute raw queries against a deprecated connection format.
   - Non-standard folder naming (`LeetCodeAgent_Backend` and `agentify-leetcode-agent-main`) hinders clarity and onboarding.

---

## 3. Goals & Non-Goals

### Goals
- Rename `agentify-leetcode-agent-main` to `frontend/`.
- Rename `LeetCodeAgent_Backend` to `backend/`.
- Purge all Next.js frontend artifacts (`app/`, `components/`, `lib/`, `public/`, `package*.json`, `tailwind*`, `next*`, `postcss*`, `jsconfig*`, `eslint*`) from `backend/`.
- Remove dead scripts (`python.py`) from `backend/`.
- Resolve all Git merge conflict markers across all configuration files.
- Produce a unified, clean top-level `README.md` representing the unified Agentify platform.

### Non-Goals
- Modifying UI component logic or API route handlers (functional refactoring is out of scope).
- Migrating from Tailwind CSS to another styling framework.

---

## 4. Proposed Architecture & Target Layout

```
e:\Agentfy\
├── backend/                              # Pure Python/FastAPI backend
│   ├── api_server.py                     # FastAPI REST API endpoints
│   ├── config.py                         # Configuration loader
│   ├── course_email_scheduler.py         # 9:00 AM company course scheduler
│   ├── course_service.py                 # Neon DB course & user subscription service
│   ├── daily_scheduler.py                # 8:00 AM daily challenge scheduler
│   ├── email_service.py                  # Brevo email dispatch service
│   ├── gemini_integration.py             # Gemini AI LeetCode analysis engine
│   ├── leetcode_analyzer.py              # GitHub repo solution scraper
│   ├── llm_prompt.txt                    # System prompt templates
│   ├── main.py                           # Multiprocessing orchestrator
│   ├── requirements.txt                  # Python dependencies
│   └── run.py                            # Standalone CLI runner
├── frontend/                             # Pure Next.js 16 frontend
│   ├── app/                              # App router pages & context
│   ├── components/                       # UI, Auth, and Dashboard components
│   ├── lib/                              # Firebase auth & Axios API client
│   ├── public/                           # Static assets & icons
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.js
│   ├── package.json                      # Clean dependencies (Axios, Firebase, Recharts)
│   ├── package-lock.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── docs/
│   └── rfcs/                             # RFC specifications & architecture docs
├── .gitignore                            # Root unified ignore rules
└── README.md                             # Unified project overview & quickstart
```

---

## 5. Step-by-Step Implementation Plan

1. **Folder Renaming**:
   - Rename `agentify-leetcode-agent-main` -> `frontend`.
   - Rename `LeetCodeAgent_Backend` -> `backend`.
2. **Purge Frontend Redundancy in `backend/`**:
   - Remove folders: `backend/app`, `backend/components`, `backend/lib`, `backend/public`.
   - Remove files: `backend/package.json`, `backend/package-lock.json`, `backend/next.config.js`, `backend/tailwind.config.js`, `backend/postcss.config.*`, `backend/jsconfig.json`, `backend/eslint.config.mjs`.
3. **Clean Dead Files**:
   - Remove `backend/python.py`.
   - Remove inner `backend/.gitignore` (superseded by root `.gitignore` in RFC-0003).
4. **Verification**:
   - Validate `backend/` contains only Python and text assets.
   - Run `node -v` and test `npm run build` or `npm run dev` in `frontend/`.
   - Validate no `<<<<<<<` markers exist across the entire repository.

---

## 6. Acceptance Criteria
- [x] Root directories are cleanly organized into `frontend/`, `backend/`, and `docs/`.
- [x] Zero Next.js or React files reside inside `backend/`.
- [x] Zero conflict markers (`<<<<<<<`) exist in any file in the workspace.
- [x] Frontend builds or starts via `npm run dev` in `frontend/`.
- [x] Backend imports and starts via `python api_server.py` or `python main.py` in `backend/`.
