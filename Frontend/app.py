from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import openai
import random

# Load environment variables
load_dotenv()

# Flask app
app = Flask(_name_)
CORS(app)

# Environment variables
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

# -------------------- 📧 EMAIL TOOL --------------------
def send_email(to_email, subject, body):
    msg = EmailMessage()
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)

# -------------------- 🧠 LLM TOOL --------------------
def llm_analyze_complaint(text):
    prompt = f"""
You are an AI government complaint analyzer.

Analyze the complaint and return ONLY valid JSON:
{{
  "issue": "...",
  "department": "...",
  "urgency": "Low / Medium / High"
}}

Complaint:
{text}
"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    return eval(response.choices[0].message.content)

# -------------------- 🤖 AI AGENT --------------------
def complaint_agent(complaint_text):
    plan = [
        "Understand complaint",
        "Analyze using LLM",
        "Assign department",
        "Decide urgency",
        "Generate ticket",
        "Send email notifications"
    ]

    analysis = llm_analyze_complaint(complaint_text)

    ticket_id = "SC-" + str(random.randint(1000, 9999))

    return {
        "plan": plan,
        "issue": analysis["issue"],
        "department": analysis["department"],
        "urgency": analysis["urgency"],
        "ticket_id": ticket_id
    }

# -------------------- 📌 API ENDPOINT --------------------
@app.route("/send-complaint", methods=["POST"])
def send_complaint():
    data = request.get_json()
    complaint_text = data.get("complaint", "")

    if not complaint_text.strip():
        return jsonify({"error": "Complaint text required"}), 400

    agent_result = complaint_agent(complaint_text)

    citizen_email = "rahulkgupta0705@gmail.com"
    government_email = "anshukrbhagat@gmail.com"

    # Citizen email
    send_email(
        citizen_email,
        "Complaint Registered Successfully",
        f"""
Dear Citizen,

Your complaint has been registered successfully.

Issue: {agent_result['issue']}
Department: {agent_result['department']}
Urgency: {agent_result['urgency']}
Token ID: {agent_result['ticket_id']}

Regards,
Smart Complaint Resolver (AI Agent)
"""
    )

    # Government email
    send_email(
        government_email,
        f"New Complaint Received - {agent_result['ticket_id']}",
        f"""
New complaint registered.

Issue: {agent_result['issue']}
Department: {agent_result['department']}
Urgency: {agent_result['urgency']}
Token ID: {agent_result['ticket_id']}

Complaint Details:
{complaint_text}
"""
    )

    return jsonify({
        "status": "success",
        "agent_output": agent_result
    })

# -------------------- 🚀 RUN SERVER --------------------
if _name_ == "_main_":
    app.run(debug=True)