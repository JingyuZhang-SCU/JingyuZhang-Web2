function formatDate(dateString) {
  if (!dateString) return '';
  if (dateString.length === 10) return dateString;
  const d = new Date(dateString);
  return isNaN(d) ? 'Invalid Date' : d.toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  if (!eventId) {
    document.getElementById('event-detail').innerHTML = '<p>Invalid event ID.</p>';
    return;
  }

  fetch(`/api/events/${eventId}`)
    .then(res => res.json())
    .then(event => {
      const progress = event.goal_amount > 0 
        ? ((event.current_amount / event.goal_amount) * 100).toFixed(1)
        : 0;

      document.getElementById('event-detail').innerHTML = `
        <h1>${event.name}</h1>
        <p><strong>Date:</strong> ${formatDate(event.event_date)}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Ticket Price:</strong> $${event.ticket_price}</p>
        <p><strong>Goal:</strong> $${event.goal_amount} | <strong>Raised:</strong> $${event.current_amount} (${progress}%)</p>
        <div style="width:100%; background:#eee; height:20px; border-radius:10px;">
          <div style="width:${progress}%; height:100%; background:#2ecc71;"></div>
        </div>
      `;
    })
    .catch(err => {
      document.getElementById('event-detail').innerHTML = '<p>Event not found.</p>';
    });

  document.getElementById('register-btn').onclick = () => {
    alert('This feature is currently under construction.');
  };
});