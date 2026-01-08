/* Typing Slogan Effect */
const text = "Empowering Citizens • AI-Driven • Transparent Governance";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("slogan").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 60);
    }
}
typeEffect();

/* Password Strength */
function checkStrength() {
    const pwd = document.getElementById("password").value;
    const strength = document.getElementById("strength");

    if (pwd.length < 6) {
        strength.style.color = "red";
        strength.innerText = "Weak password";
    } else if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/)) {
        strength.style.color = "green";
        strength.innerText = "Strong password";
    } else {
        strength.style.color = "orange";
        strength.innerText = "Medium password";
    }
}

/* Signup */
function signup() {
    alert("Signup Successful! Welcome to Smart Governance 🚀");
}
