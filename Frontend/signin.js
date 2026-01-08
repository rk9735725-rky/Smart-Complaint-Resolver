function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    // Dummy login (hackathon/demo)
    alert("Login successful! Welcome to Smart Complaint Resolver 🚀");
    window.location.href = "index.html";
}
