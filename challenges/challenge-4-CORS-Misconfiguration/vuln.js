const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(cookieParser());

// For the sake of the challenge, imagine this comes from a database instead of being hardcoded
const users = {
  admin: {
    username: 'admin',
    apiKey: '<some-secret-API-key>'
  }
};
# CORS Misconfiguration: Allowing any origin that makes a request
# This is insecure because it allows any website to make requests and read responses
# including sensitive data like API keys if the user is authenticated.
# In a secure setup, you would specify allowed origins explicitly.
app.use((req, res, next) => {
    const origin = req.get('Origin');
    if (origin) {
        res.header('Access-Control-Allow-Origin', origin); 
        res.header('Access-Control-Allow-Credentials', 'true'); 
    }
    next();
});

// Imagine this is a fully grown login
app.get('/mock-login', (req, res) => {
    res.cookie('auth', users.admin.username, { httpOnly: true, secure: true, sameSite: "none"});
    return res.status(200).json({ message: 'Login successful!' });;
});

app.get('/api-key', (req, res) => {
    const username = req.cookies.auth;

    if (username && users[username]) {
        return res.status(200).json({ data: users[username].apiKey });
    }

    return res.status(403).json({ message: 'Unauthorized access!' });
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});