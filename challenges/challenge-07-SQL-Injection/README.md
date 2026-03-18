# Challenge 7 – Spring JdbcTemplate ORDER BY SQL Injection

This challenge demonstrates **SQL Injection (CWE-89)** caused by concatenating a user-controlled
request parameter into an SQL `ORDER BY` clause.

## Vulnerability
The `/users` endpoint accepts `orderBy` from the request:

- `@RequestParam String orderBy`

It then builds SQL using string concatenation:

- `String query = "SELECT * FROM users ORDER BY " + orderBy;`

Because `orderBy` is attacker-controlled, this can lead to SQL injection.

## Files
- sqli.yaml – Semgrep rule to detect ORDER BY concatenation passed to JdbcTemplate
- vuln.java – Vulnerable controller (concatenates orderBy into SQL)
- sol.java – Fixed controller (uses an allowlist for allowed columns)

## Run
semgrep --config sqli.yaml .

## Expected
- vuln.java → finding
- sol.java → no findings

## Key idea
Placeholders (`?`) do not work for SQL identifiers (like column names). To safely support sorting,
use an explicit allowlist (or map a limited set of sort keys to known-safe column names) and never
concatenate raw request parameters into SQL.
