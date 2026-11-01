# RFC-0003: Secrets Management & Security Hardening

- **RFC ID:** RFC-0003
- **Title:** Secrets Management & Security Hardening
- **Author:** Antigravity Pair Programmer
- **Status:** Implemented
- **Priority:** Critical (P0)
- **Created Date:** 2026-11-01
- **Target Component:** Security, Environment Configuration & `.gitignore`

---

## 1. Summary
This RFC establishes strict secret management protocols for the Agentify codebase. It eliminates the risk of credential exposure before pushing to GitHub by creating an authoritative root `.gitignore`, safeguarding live keys in `config.json`, providing sanitized example templates, and enhancing configuration loaders to support `.env` files via `python-dotenv`.

---

## 2. Problem Statement
The current repository setup presents severe security vulnerabilities:

1. **Exposed Production Secrets**:
   - `LeetCodeAgent_Backend/config.json` contains live production credentials:
     - Google Gemini API Key
     - Neon Cloud PostgreSQL credentials (username, host, database name, and plaintext password)
     - Brevo Email Dispatch API Key
     - GitHub Personal Access Token (PAT)
2. **Missing Active Git Ignore Rules**:
   - The root directory only has `.gitignore.txt` (with a `.txt` extension), which Git ignores completely.
   - The backend `.gitignore` contains merge conflict markers and is currently ineffective.
   - Executing `git add .` will immediately stage `config.json` and `.env.local` into Git index.
   - Pushing this commit to GitHub triggers automated secret scanners, immediately revoking credentials or exposing them to public crawlers.

---

## 3. Goals & Non-Goals

### Goals
- Replace `.gitignore.txt` with a production-grade, authoritative `.gitignore` at the repository root.
- Ensure `config.json`, `.env`, `.env.local`, `node_modules/`, `.next/`, and `__pycache__/` can never be tracked or staged by Git.
- Provide a sanitized `backend/config.example.json` template with clear placeholders for contributors.
- Provide a sanitized `frontend/.env.example` template for Firebase and API configuration.
- Enhance backend configuration parsing (`backend/config.py` and `backend/api_server.py`) to gracefully read from environment variables or `config.json`.
- Preserve the user's local working credentials in `config.json` without deleting them.

### Non-Goals
- Deploying a third-party vault service (e.g., HashiCorp Vault, AWS Secrets Manager) for local development.
- Resetting active database credentials on the cloud provider (unless already leaked externally).

---

## 4. Proposed Solution & Architecture

### 1. Authoritative Root `.gitignore`
A unified `.gitignore` file at `e:\Agentfy\.gitignore`:

```gitignore
# ==========================================
# Critical Secrets & Local Configurations
# ==========================================
config.json
**/config.json
*.env
*.env.local
*.env.*.local
*.pem
*.key

# ==========================================
# Node.js & Next.js
# ==========================================
node_modules/
.next/
out/
build/
dist/
.pnp
.pnp.js
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# ==========================================
# Python Artifacts & Environments
# ==========================================
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/
ENV/

# ==========================================
# Operating System & IDE
# ==========================================
.DS_Store
Thumbs.db
.vscode/
.idea/
*.sublime-project
*.sublime-workspace
```

### 2. Sanitized Template Files

#### `backend/config.example.json`
```json
{
  "gemini_api_key": "YOUR_GEMINI_API_KEY_HERE",
  "database": {
    "host": "your-neon-host.aws.neon.tech",
    "dbname": "neondb",
    "user": "neondb_owner",
    "password": "YOUR_NEON_PASSWORD_HERE",
    "port": 5432,
    "sslmode": "require"
  },
  "email": {
    "api_key": "YOUR_BREVO_API_KEY_HERE",
    "sender_email": "your-verified-sender@example.com",
    "sender_name": "Agentify"
  },
  "github_token": "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN_OPTIONAL"
}
```

#### `frontend/.env.example`
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

---

## 5. Implementation Steps
1. Delete redundant `e:\Agentfy\.gitignore.txt`.
2. Write `.gitignore` at root `e:\Agentfy\.gitignore`.
3. Create `backend/config.example.json` and `frontend/.env.example`.
4. Run `git status --ignored` to verify that `config.json` is explicitly highlighted under **Ignored files**.
5. Ensure `git check-ignore -v backend/config.json` confirms ignore rules are matching.

---

## 6. Acceptance Criteria
- [x] `e:\Agentfy\.gitignore` exists and is tracked.
- [x] `e:\Agentfy\.gitignore.txt` is removed.
- [x] `git check-ignore -v backend/config.json` outputs matching ignore rule.
- [x] `backend/config.example.json` exists with placeholders and no real secret values.
- [x] `frontend/.env.example` exists with required variables.
- [x] Staging all files (`git add .`) does NOT stage `config.json` or `.env` files.
