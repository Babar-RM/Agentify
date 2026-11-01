# RFC-0004: Windows Console Encoding & Cross-Platform Logging Resilience

- **RFC ID:** RFC-0004
- **Title:** Windows Console Encoding & Cross-Platform Logging Resilience
- **Author:** Antigravity Pair Programmer
- **Status:** Implemented
- **Priority:** Medium (P1)
- **Created Date:** 2026-11-01
- **Target Component:** Python Backend Runtime & Console Output

---

## 1. Summary
This RFC addresses the Windows console encoding failure where Python crashes with `UnicodeEncodeError` (`charmap` codec) when emitting Unicode emoji characters in console logs. It implements automatic UTF-8 stream reconfiguration and encoding-resilient logging handlers across all backend entrypoints, guaranteeing that the backend starts smoothly on Windows without requiring manual shell environment configurations.

---

## 2. Problem Statement
Windows shells (PowerShell and Command Prompt) default to legacy OEM/ANSI code pages such as `cp1252` or `cp437`. 

The Agentify backend scripts (`api_server.py`, `main.py`, `run.py`, `daily_scheduler.py`, etc.) extensively use Unicode emojis and symbols for console formatting:
- `✅` (`\u2705`)
- `🚀` (`\U0001f680`)
- `🔍` (`\U0001f50d`)
- `📧` (`\U0001f4e7`)
- `📚` (`\U0001f4da`)
- `❌` (`\u274c`)
- `•` (`\u2022`)

When a developer runs `python main.py` or imports `api_server` in standard Windows PowerShell without previously setting `$env:PYTHONUTF8=1`, Python crashes on the very first print statement:
```
Traceback (most recent call last):
  File "E:\Agentfy\LeetCodeAgent_Backend\api_server.py", line 23, in <module>
    print("\u2705 Configuration loaded")
  File "C:\Program Files\Python312\Lib\encodings\cp1252.py", line 19, in encode
    return codecs.charmap_encode(input,self.errors,encoding_table)[0]
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
UnicodeEncodeError: 'charmap' codec can't encode character '\u2705' in position 0: character maps to <undefined>
```

Relying on developers to remember to set `$env:PYTHONUTF8=1` in every shell session is brittle and causes friction.

---

## 3. Goals & Non-Goals

### Goals
- Automatically configure Python's standard output (`sys.stdout`) and error output (`sys.stderr`) streams to UTF-8 encoding whenever the script runs on Windows.
- Ensure logging handlers (`StreamHandler`) safely encode Unicode characters or use UTF-8 streams.
- Ensure all backend entrypoints (`main.py`, `api_server.py`, `run.py`, `daily_scheduler.py`, `course_email_scheduler.py`) include the initialization guard.
- Eliminate `UnicodeEncodeError` across all Windows development environments.

### Non-Goals
- Removing emojis or redesigning console status messages.
- Supporting legacy Python versions older than 3.8 (`sys.stdout.reconfigure` is supported natively in Python 3.7+).

---

## 4. Proposed Solution

### Automated UTF-8 Stream Initialization
Add a lightweight, zero-dependency encoding guard at the top of every backend entrypoint before any output or logging occurs:

```python
import sys
import os

# Ensure UTF-8 console output on Windows to prevent UnicodeEncodeError with emojis
if sys.platform == 'win32':
    try:
        if hasattr(sys.stdout, 'reconfigure'):
            sys.stdout.reconfigure(encoding='utf-8')
        if hasattr(sys.stderr, 'reconfigure'):
            sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass
```

### Logging StreamHandler UTF-8 Safety
Ensure `logging.StreamHandler(sys.stdout)` uses the reconfigured UTF-8 stream:
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [%(name)s] - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
```

---

## 5. Implementation Steps
1. Apply the stream reconfigure guard to:
   - `backend/api_server.py`
   - `backend/main.py`
   - `backend/run.py`
   - `backend/daily_scheduler.py`
   - `backend/course_email_scheduler.py`
2. Test execution in PowerShell without `$env:PYTHONUTF8=1`:
   ```powershell
   Remove-Item env:PYTHONUTF8 -ErrorAction SilentlyContinue
   python -c "import api_server; print('API Loaded Successfully')"
   ```
3. Verify that all emojis print without throwing `UnicodeEncodeError`.

---

## 6. Acceptance Criteria
- [x] Running `python main.py` in standard PowerShell with no environment variables set completes without `UnicodeEncodeError`.
- [x] Running `uvicorn api_server:app --port 8000` starts and prints status messages without encoding crashes.
- [x] Both Windows and Linux/macOS environments produce identical console output.
