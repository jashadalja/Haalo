from flask import Flask, jsonify, request
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random

app = Flask(__name__)
CORS(app)

# Email configuration
SMTP_SERVER = 'smtp.gmail.com'  # Gmail SMTP server
SMTP_PORT = 587  # Port for TLS
SMTP_USER = 'hallohelpcenter@gmail.com'  # Replace with your email address
SMTP_PASSWORD = 'afbs zgkn ranf eqhg'  # Replace with your email password


@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    recipient_email = data.get('recipient_email')
    otp = random.randint(100000, 999999)  # Generate a random 6-digit OTP

    message = MIMEMultipart()
    message['From'] = SMTP_USER
    message['To'] = recipient_email
    message['Subject'] = "Verify OTP"
    body = f"""
    <html>
    <body>
        <div style="text-align: center; font-family: Arial, sans-serif;">
        <h2 style="color: #4CAF50;">Your OTP Code</h2>
        <p style="font-size: 18px;">Please use the following OTP to verify your email:</p>
        <p style="font-size: 24px; font-weight: bold; color: #333;">{otp}</p>
        </div>
    </body>
    </html>
    """
    message.attach(MIMEText(body, "html"))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, recipient_email, message.as_string())
        server.quit()
        return jsonify({"OTP": otp}), 200
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=6020)
