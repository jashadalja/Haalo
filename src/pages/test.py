# server1.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)

# Store the random number in a global variable
random_number = None

# Email configuration
SMTP_SERVER = 'smtp.example.com'  # Replace with your SMTP server
SMTP_PORT = 587  # Port for TLS
SMTP_USER = 'your-email@example.com'  # Replace with your email address
SMTP_PASSWORD = 'your-password'  # Replace with your email password
USER_EMAIL = 'recipient@example.com'  # Replace with recipient's email address

def send_email(number):
    """Send the random number to the user's email."""
    msg = MIMEText(f"Your verification number is {number}")
    msg['Subject'] = 'Your Verification Number'
    msg['From'] = SMTP_USER
    msg['To'] = USER_EMAIL

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, USER_EMAIL, msg.as_string())

@app.route('/generate-number', methods=['GET'])
def generate_number():
    global random_number
    random_number = random.randint(100000, 999999)  # Generate a 6-digit number
    send_email(random_number)  # Send the number via email
    return jsonify({'message': 'Number sent to email'})

@app.route('/verify-number', methods=['POST'])
def verify_number():
    data = request.json
    user_number = data.get('number')
    if user_number == str(random_number):  # Compare as string
        return jsonify({'message': 'Number verified successfully'})
    else:
        return jsonify({'message': 'Incorrect number'}), 400

if __name__ == '__main__':
    app.run(port=6020)
