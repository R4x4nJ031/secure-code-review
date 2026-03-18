# Flask Open Redirect – Challenge 1

This Challenge demonstrates an open redirect vulnerability in Flask and how Semgrep taint analysis detects it.

## Files
- open_redirect.yaml – Semgrep taint rule (user input → redirect sink)
- vuln.py – Vulnerable open redirect
- sol.py – Secure redirect using server-side allowlist

## Run
semgrep --config redirect.yaml .

## Expected
- vuln.py → finding
- sol.py → no findings

Key idea: user input is tainted; if it reaches redirect(), it’s a vulnerability.
