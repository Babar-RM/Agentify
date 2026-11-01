# RFC-0001: Git Architecture Restructuring & Clean Repository Initialization

- **RFC ID:** RFC-0001
- **Title:** Git Architecture Restructuring & Clean Repository Initialization
- **Author:** Antigravity Pair Programmer
- **Status:** Proposed
- **Priority:** High (P0)
- **Created Date:** 2026-11-01
- **Target Component:** Git Version Control & Workspace Root

---

## 1. Summary
This RFC addresses the repository tracking anomalies caused by nested `.git` directories and submodule artifacts within `e:\Agentfy`. It establishes a clean, unified Git monorepo structure pointing to a brand-new GitHub repository remote while preventing detached submodule pointers or untracked directory states.

---

## 2. Problem Statement
The current workspace directory contains three separate, conflicting Git repositories:
1. **Root repository (`e:\Agentfy`)**: Pointing to `https://github.com/Babar-RM/Agentify.git`.
2. **Backend subfolder (`LeetCodeAgent_Backend`)**: Contains its own `.git` directory pointing to `https://github.com/ArsalanTheCoder/CodePulse-AI`.
3. **Frontend subfolder (`agentify-leetcode-agent-main`)**: Contains its own `.git` directory pointing to `https://github.com/Babar-RM/leet_code-agent.git`.

### Impact & Anomalies
- In the root Git repository (`e:\Agentfy`), `agentify-leetcode-agent-main` is recorded as a **subproject gitlink (mode 160000)** rather than tracked files.
- `git status` reports `modified: agentify-leetcode-agent-main (untracked content)`.
- Staging and pushing the project to a new repository will either fail to track frontend files or push empty submodule links that break when cloned by others.
- The user wishes to publish this project to a **new, clean GitHub repository**, decoupled from past repositories and collaborator accounts.

---

## 3. Goals & Non-Goals

### Goals
- Completely remove internal `.git` metadata from child directories (`LeetCodeAgent_Backend` and `agentify-leetcode-agent-main`).
- Remove submodule gitlink references from the root Git cache without deleting local source files.
- Re-configure root Git remotes to point to the user's new repository URL.
- Ensure all source code across both frontend and backend is cleanly staged as regular tracked files.

### Non-Goals
- Altering branch history of the external upstream repositories (`CodePulse-AI` or `leet_code-agent`).
- Managing Git LFS (Large File Storage) at this phase.

---

## 4. Proposed Solution

### Architecture Transition

```
CURRENT STATE (Fragmented & Conflicted):
e:\Agentfy (.git -> Babar-RM/Agentify)
 ├── LeetCodeAgent_Backend (.git -> ArsalanTheCoder/CodePulse-AI)
 └── agentify-leetcode-agent-main (.git -> Babar-RM/leet_code-agent) [Submodule Link 160000]

TARGET STATE (Unified Monorepo):
e:\Agentfy (.git -> New GitHub Repository)
 ├── backend/ (Tracked as standard files)
 └── frontend/ (Tracked as standard files)
```

### Detailed Operational Steps

1. **Purge Internal `.git` Folders**:
   Recursively delete `.git` directories located inside `LeetCodeAgent_Backend` and `agentify-leetcode-agent-main`.
   ```powershell
   Remove-Item -Recurse -Force "e:\Agentfy\LeetCodeAgent_Backend\.git" -ErrorAction SilentlyContinue
   Remove-Item -Recurse -Force "e:\Agentfy\agentify-leetcode-agent-main\.git" -ErrorAction SilentlyContinue
   ```

2. **Remove Git Submodule Cache Index**:
   De-index the submodule entry from the root index while preserving files on disk:
   ```powershell
   git rm --cached agentify-leetcode-agent-main
   ```

3. **Re-align Remote Origin**:
   Remove existing `origin` pointing to `Babar-RM/Agentify.git` and attach the new target GitHub URL:
   ```powershell
   git remote remove origin
   git remote add origin https://github.com/<YOUR_USER>/<NEW_REPO>.git
   ```

---

## 5. Security & Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| Accidental file loss during submodule de-indexing | Low | High | Use `git rm --cached` exclusively (never omit `--cached`). |
| Premature push before secret exclusion | High | Critical | Execute RFC-0003 (Secrets Hardening) prior to `git add .` and `git push`. |

---

## 6. Acceptance Criteria
- [ ] `LeetCodeAgent_Backend/.git` does not exist.
- [ ] `agentify-leetcode-agent-main/.git` does not exist.
- [ ] Root `git ls-files -s` does not contain any mode `160000` entries.
- [ ] `git remote -v` outputs only the designated new GitHub repository.
- [ ] All source files in child directories appear as regular untracked/staged files in `git status`.
