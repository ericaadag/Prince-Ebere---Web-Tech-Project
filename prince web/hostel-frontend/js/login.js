function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  })
  .then(response => response.json())
  .then(data => {
    if (data.role === "admin") {
      window.location.href = "admin.html";
    } else if (data.role === "student") {
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("errorMsg").innerText = data.message || "Login failed.";
    }
  })
  .catch(error => {
    console.error("Login error:", error);
    document.getElementById("errorMsg").innerText = "Server error. Try again.";
  });
}
