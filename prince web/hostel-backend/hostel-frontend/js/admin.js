function fetchApplications() {
  fetch('http://localhost:5000/api/application')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('applications');
      container.innerHTML = '';
      data.forEach(app => {
        const div = document.createElement('div');
        div.className = "application";
        div.innerHTML = `
          <p><strong>Applicant:</strong> ${app.email}</p>
          <p><strong>Room Type:</strong> ${app.roomType}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error fetching applications:', error);
    });
}
