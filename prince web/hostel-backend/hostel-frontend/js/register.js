function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      window.location.href = "login.html";
    } else {
      document.getElementById("errorMsg").innerText = data.message || "Registration failed.";
    }
  })
  .catch(error => {
    console.error("Register error:", error);
    document.getElementById("errorMsg").innerText = "Server error. Try again.";
  });
}
