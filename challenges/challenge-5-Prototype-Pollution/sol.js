const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Assume that this is a fully-grown database
let users = {
    guest: { password: "guest", profile: "My cool profile" }
};

const ALLOWED_KEYS = new Set(["profile"]);
const BLOCKED_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function merge(target, source) {
  if (!source || typeof source !== "object") return;

  for (const [key, value] of Object.entries(source)) {
    if (BLOCKED_KEYS.has(key)) continue;     // prototype pollution defense
    if (!ALLOWED_KEYS.has(key)) continue;    // mass assignment defense
    target[key] = value;
  }
}


// Mock login function - just sets a cookie for "guest" (imagine this to be a fully-grown login functionality)
app.post("/guest-login", (req, res) => {
    res.cookie("username", "guest", { httpOnly: true });
    res.json({ message: "Logged in as guest!" });
});

app.post("/update-profile", (req, res) => {
    let username = req.cookies.username;
    if (!username || !users[username]) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let user = users[username];
    merge(user, req.body);

    res.json({ message: "Profile updated", user });
});

app.get("/admin", (req, res) => {
    let user = users[req.cookies.username];
    if (user && user.isAdmin) {
        return res.send("Welcome, Admin!");
    }
    res.status(403).send("Access Denied");
});

app.listen(3000, () => console.log("Server running on port 3000"));