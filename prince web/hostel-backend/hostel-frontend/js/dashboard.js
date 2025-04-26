function applyForRoom() {
  const roomType = document.getElementById("roomType").value.trim();

  fetch('http://localhost:5000/api/application', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomType })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      document.getElementById("successMsg").innerText = "Application submitted!";
    } else {
      document.getElementById("successMsg").innerText = "Application failed.";
    }
  })
  .catch(error => {
    console.error("Application error:", error);
    document.getElementById("successMsg").innerText = "Server error. Try again.";
  });
}
