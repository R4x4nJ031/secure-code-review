# node.js SSRF – Challenge 2

This challenge demonstrates an **SSRF (Server-Side Request Forgery)** vulnerability in **Node.js (Express)** and how **Semgrep taint analysis** detects it.

## Files
- `ssrf.yaml` – Semgrep taint rule (**user input → outbound HTTP request sink**)
- `vuln.js` – Vulnerable endpoint where user input controls an outbound HTTP request
- `sol.js` – Secure implementation using a **server-controlled destination / allowlist**

## Run
```bash
semgrep --config ssrf.yaml .
