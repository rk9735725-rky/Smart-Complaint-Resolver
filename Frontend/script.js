function analyzeComplaint(text) {
  text = text.toLowerCase();

  let issue = "General Complaint";
  let department = "Public Services";
  let urgency = "Low";

  if (text.includes("street") || text.includes("light")) {
    issue = "Street Light Issue";
    department = "Electricity Department";
    urgency = "Medium";
  }

  if (text.includes("water")) {
    issue = "Water Supply Issue";
    department = "Water Department";
    urgency = "High";
  }

  if (text.includes("garbage")) {
    issue = "Garbage Issue";
    department = "Municipal Corporation";
    urgency = "Low";
  }

  return { issue, department, urgency };
}

function getSteps() {
  return [
    "Analyze complaint text",
    "Identify issue category",
    "Assign responsible department",
    "Decide urgency",
    "Generate ticket ID",
    "Generate complaint letter"
  ];
}

function generateLetter(data, ticketId) {
  return `
To,
The ${data.department}

Subject: Complaint regarding ${data.issue}

Respected Sir/Madam,

I would like to report the issue regarding ${data.issue}.
Kindly take necessary action at the earliest.

Token ID: ${ticketId}

Thank you.
`;
}

function resolveComplaint() {
  const text = document.getElementById("complaintText").value;

  if (!text.trim()) {
    alert("Please enter a complaint");
    return;
  }

  const analysis = analyzeComplaint(text);
  const steps = getSteps();

  const ticketId = "SC-" + Math.floor(Math.random() * 9000 + 1000);
  const letter = generateLetter(analysis, ticketId);

  document.getElementById("output").innerHTML = `
    <h3>AI Planned Steps</h3>
    <ol>${steps.map(step => <li>${step}</li>).join("")}</ol>

    <p><b>Issue:</b> ${analysis.issue}</p>
    <p><b>Department:</b> ${analysis.department}</p>
    <p><b>Urgency:</b> ${analysis.urgency}</p>
    <p><b>Token ID:</b> ${ticketId}</p>

    <h4>Generated Complaint Letter</h4>
    <pre>${letter}</pre>
  `;

  let history = JSON.parse(localStorage.getItem("complaints")) || [];
  history.push({ ticketId, issue: analysis.issue });
  localStorage.setItem("complaints", JSON.stringify(history));
}

function startVoice() {
  const recognition =
    new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = function (event) {
    document.getElementById("complaintText").value =
      event.results[0][0].transcript;
  };
}

function agentPlan(goal) {
  return [
    { step: "Understand goal", tool: "NLP Analyzer" },
    { step: "Classify complaint", tool: "Rule Engine" },
    { step: "Assign department", tool: "Mapping Tool" },
    { step: "Decide urgency", tool: "Priority Engine" },
    { step: "Generate ticket", tool: "ID Generator" },
    { step: "Create complaint letter", tool: "Document Generator" }
  ];
}