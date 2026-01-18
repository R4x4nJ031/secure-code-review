# Challenge 4 – Express CORS Misconfiguration (Reflect Origin + Credentials)

This challenge demonstrates a dangerous CORS pattern in an Express app:
**reflecting the request Origin** and enabling **credentialed CORS**.

## Vulnerability
The server reads the `Origin` header from the request and mirrors it back in:
`Access-Control-Allow-Origin`.

When combined with:
`Access-Control-Allow-Credentials: true`

a malicious website can use the victim’s browser (and cookies) to call sensitive endpoints
and **read** the response data.

## Files
- cors.yaml – Semgrep rule to detect "reflect Origin + credentials" CORS misconfiguration
- vuln.js – Vulnerable Express app (reflects Origin and allows credentials)
- sol.js – Fixed Express app (origin allowlist + Vary: Origin)

## Run
semgrep --config cors.yaml .

## Expected
- vuln.js → finding
- sol.js → no findings

## Key idea
User-controlled `Origin` becomes dangerous when it is echoed into
`Access-Control-Allow-Origin` while credentials are enabled.
Fix by using an explicit allowlist of trusted origins (never reflect arbitrary Origin),
and add `Vary: Origin` when responding dynamically.
