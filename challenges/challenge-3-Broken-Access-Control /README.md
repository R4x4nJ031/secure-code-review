# Flask IDOR – Challenge 3

This challenge demonstrates a **Broken Access Control / IDOR (CWE-639)** issue in Flask and how Semgrep can flag the risky **pattern** (user-controlled identifier → fetch → update).

## Files
- idor.yaml – Semgrep rule (pattern-based) to detect IDOR shape (request input → get_user_profile → update_user_profile)
- vuln.py – Vulnerable profile update (client controls which user gets updated)
- sol.py – Secure update (target user comes from server-trusted identity like session/current_user)

## Run
semgrep --config idor.yaml .

## Expected
- vuln.py → finding
- sol.py → no findings

Key idea: the app uses **untrusted request input** to select the object being modified; without ownership/role checks (or using server-trusted identity), this becomes IDOR.
