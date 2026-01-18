# Challenge 5 – Express Mass Assignment / Prototype Pollution (Unsafe Merge)

This challenge demonstrates how a generic `merge()` that blindly copies attacker-controlled JSON
into a server-side user object can lead to privilege escalation.

## Vulnerability
The `/update-profile` endpoint merges `req.body` into the current user object:

- `req.body` is attacker-controlled JSON
- `merge()` copies all keys without filtering

This enables:
- **Mass assignment**: attacker sends `{ "isAdmin": true }` and becomes admin
- **Prototype pollution attempts**: attacker sends keys like `__proto__`, `constructor`, `prototype`

## Files
- prototype-pollution.yaml – Semgrep rule to detect the unsafe `merge()` implementation + its use with `req.body`
- vuln.js – Vulnerable app (blind merge + admin check)
- sol.js – Secure app (allowlist fields + blocks prototype pollution keys)

## Run
semgrep -c prototype-pollution.yaml .

## Expected
- vuln.js → finding
- sol.js → no findings

Key idea: never copy all user-supplied fields into server-side objects.
Use an allowlist of permitted fields and block prototype pollution keys.
