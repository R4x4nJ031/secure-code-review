from flask import Flask, request, redirect, url_for

app = Flask(__name__)

# Simulated "authentication" check
def is_authenticated():
    return True

class User:
    def __init__(self, username):
        self.username = username

    def get_username(self):
        return self.username

# we are getting the username from the form directly from the user  
class UserProfileService:
    def get_user_profile(self, username):
        if username == 'testuser':
            return User(username)
        return None

    def update_user_profile(self, user_profile):
        msg = f"Updated profile for user: {user_profile.get_username()}"
        print(msg)
        return msg

user_profile_service = UserProfileService()

@app.route('/')
def home():
    return '''
        <form action="/edit-profile" method="post">
            <input type="text" name="username" value="testuser" />
            <input type="submit" value="Edit Profile" />
        </form>
    '''
# Vulnerable endpoint 
@app.route('/edit-profile', methods=['POST'])
def edit_profile():
    if not is_authenticated():
        return redirect(url_for('login'))
# Here we are trusting the username from the form without verifying it against the authenticated user
    username = request.form.get('username')
    user_profile = user_profile_service.get_user_profile(username)
# We allow profile updates based on the username provided in the form
    if user_profile and user_profile.get_username() == username:
        return user_profile_service.update_user_profile(user_profile)
# This allows any user to update any profile by changing the username in the form
    return "User not found or mismatch", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)