document.addEventListener('DOMContentLoaded', () => {
  fetchApplications();
});

async function fetchApplications() {
  try {
    const response = await fetch('http://localhost:5000/api/application');
    const applications = await response.json();

    const applicationsContainer = document.getElementById('applicationsContainer');
    applicationsContainer.innerHTML = '';

    // Create table structure
    const table = document.createElement('table');
    table.className = 'applications-table';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Student ID</th>
        <th>Email</th>
        <th>Room Type</th>
        <th>Room Number</th>
        <th>Reason</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    
    applications.forEach(app => {
      const row = document.createElement('tr');
      row.className = 'application-row';
      
      row.innerHTML = `
        <td>${app.studentId}</td>
        <td>${app.email}</td>
        <td>${app.roomType}</td>
        <td>${app.roomNumber}</td>
        <td>${app.reason}</td>
        <td>${app.status}</td>
        <td>
          ${app.status === 'pending' ? `
            <button class="action-btn approve" onclick="reviewApplication(${app.id}, 'approved')">Approve</button>
            <button class="action-btn reject" onclick="reviewApplication(${app.id}, 'rejected')">Reject</button>
          ` : '<span class="no-actions">No actions</span>'}
        </td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    applicationsContainer.appendChild(table);

  } catch (error) {
    console.error('Error fetching applications:', error);
    applicationsContainer.innerHTML = '<p class="error">Error loading applications. Please try again.</p>';
  }
}
function adjustTableLayout() {
  const container = document.querySelector('.container');
  const table = document.querySelector('.applications-table');
  
  if (window.innerWidth < 768) {
    // Mobile adjustments
    container.style.padding = '15px';
    container.style.width = '98%';
    
    // Make table headers sticky for horizontal scrolling
    table.style.display = 'block';
    table.style.overflowX = 'auto';
    table.style.whiteSpace = 'nowrap';
  } else {
    // Reset to default for larger screens
    container.style.padding = '';
    container.style.width = '';
    table.style.display = '';
    table.style.overflowX = '';
    table.style.whiteSpace = '';
  }
}

// Initialize and add resize listener
document.addEventListener('DOMContentLoaded', () => {
  fetchApplications();
  adjustTableLayout();
  window.addEventListener('resize', adjustTableLayout);
});
async function reviewApplication(id, decision) {
  try {
    const response = await fetch('http://localhost:5000/api/application/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, decision })
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      fetchApplications();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error reviewing application:', error);
    alert('Server error.');
  }
}