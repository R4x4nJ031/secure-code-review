# Challenge 6 – Go Reflected XSS (fmt.Sprintf + Query Param)

This challenge demonstrates **Reflected XSS (CWE-79)** in a Go web server when a query
parameter is inserted into HTML without escaping.

## Vulnerability
The handler reads user input from the URL query string:

- `r.URL.Query().Get("name")`

Then injects it into an HTML response using `fmt.Sprintf` and writes it back to the client.
If the input contains HTML/JS (e.g., `<script>...</script>`), the browser may execute it.

## Files
- xss.yaml – Semgrep rule to detect query param → fmt.Sprintf → fmt.Fprint (reflected XSS shape)
- vuln.go – Vulnerable Go server (unescaped query param in HTML)
- sol.go – Fixed version (uses `html.EscapeString` or `html/template`)

## Run
semgrep --config xss.yaml .

## Expected
- vuln.go → finding
- sol.go → no findings

## Key idea
Any value read from `r.URL.Query()` is attacker-controlled. If it is written into an HTML
response without escaping, it can become reflected XSS. Fix by escaping output
(`html.EscapeString`) or using `html/template` (auto-escaping).
