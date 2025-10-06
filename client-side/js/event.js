// Format date string to YYYY-MM-DD format
function formatDate(dateString) {
  if (!dateString) return '';
  if (dateString.length === 10) return dateString;
  const d = new Date(dateString);
  return isNaN(d) ? 'Invalid Date' : d.toISOString().split('T')[0];
}

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
  // Get event ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  // Validate event ID
  if (!eventId) {
    document.getElementById('event-detail').innerHTML = '<p>Invalid event ID.</p>';
    return;
  }

  // Fetch event details from API
  fetch(`/api/events/${eventId}`)
    .then(res => res.json())
    .then(event => {
      // Calculate progress percentage
      const progressPercent = event.goal_amount > 0 
        ? Math.min(100, ((event.current_amount / event.goal_amount) * 100).toFixed(1))
        : 0;

      // Populate event details in HTML
      document.getElementById('event-detail').innerHTML = `
        <h1>${event.name}</h1>
        <p><strong>Date:</strong> ${formatDate(event.event_date)}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Ticket Price:</strong> $${event.ticket_price}</p>
        <p><strong>Organisation:</strong> ${event.org_name}</p>
        <p><strong>Fundraising Goal:</strong> $${event.goal_amount.toLocaleString()}</p>
        <p><strong>Raised So Far:</strong> $${event.current_amount.toLocaleString()} (${progressPercent}%)</p>
        <div class="progress-container">
          <div class="progress-bar" style="width: ${progressPercent}%"></div>
        </div>
      `;
    })
    .catch(err => {
      // Handle error
      document.getElementById('event-detail').innerHTML = '<p>Event not found.</p>';
    });

  // Register button click handler
  document.getElementById('register-btn').onclick = () => {
    alert('This function will be further improved in A3. Please stay tuned!');
  };
});