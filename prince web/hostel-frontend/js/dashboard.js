// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  fetchAvailableRooms();

  const applicationForm = document.getElementById('applicationForm');
  applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const roomType = document.getElementById('roomType').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const reason = document.getElementById('reason').value.trim();

    if (!studentId || !email || !roomType || !roomNumber || !reason) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, email, roomType, roomNumber, reason })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Application submitted successfully!');
        applicationForm.reset();
        fetchAvailableRooms();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Server error. Try again.');
    }
  });
});

// Fetch and populate available rooms
async function fetchAvailableRooms() {
  try {
    const response = await fetch('http://localhost:5000/api/application/available-rooms');
    const data = await response.json();

    const roomTypeSelect = document.getElementById('roomType');
    const roomNumberSelect = document.getElementById('roomNumber');

    // Clear old options
    roomTypeSelect.innerHTML = '<option value="">Select Room Type</option>';
roomNumberSelect.innerHTML = '<option value="">Select Room Number</option>';
    // Populate room types
    for (const type in data) {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      roomTypeSelect.appendChild(option);
    }

    // When roomType changes, update roomNumbers
    roomTypeSelect.addEventListener('change', () => {
      const selectedType = roomTypeSelect.value;
      const numbers = data[selectedType] || [];

      roomNumberSelect.innerHTML =  '<option value="">Select Room Number</option>';
      numbers.forEach(num => {
        const option = document.createElement('option');
        option.value = num;
        option.textContent = num;
        roomNumberSelect.appendChild(option);
      });
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
}