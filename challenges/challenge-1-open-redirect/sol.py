from flask import Flask, request, redirect, url_for
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)


def is_authenticated_user():
    # This function checks if the user is authenticated and is omitted for brevity
    pass


NEXT_MAP = {
    "home": "/"
} # Server-side allowlist of redirect destinations
@app.route('/')
def home():
    if not is_authenticated_user(): # always fails
        logging.info('Unauthorized access attempt.') # takes log
        next_key = request.args.get("next") # takes input from user where he wants to go in (next to next=)
        return redirect(NEXT_MAP.get(next_key, url_for('login'))) #checks whether the user-supplied next_key exists in NEXT_MAP if it goes to that
    # falls back to login if key is missing or invalid
    return 'Welcome to the home page!'

@app.route('/login')
def login():
    # Simulated login page
    return 'Login Page - User authentication goes here.'


if __name__ == '__main__':
    app.run(debug=False)
