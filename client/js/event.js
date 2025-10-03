const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

if (!eventId) {
  document.getElementById('event-detail').innerHTML = '<p>Invalid event ID</p>';
} else {
  fetch(`http://localhost:3000/api/events/${eventId}`)
    .then(res => res.json())
    .then(event => {
      const progress = ((event.current_amount / event.goal_amount) * 100).toFixed(1);
      document.getElementById('event-detail').innerHTML = `
        <h1>${event.name}</h1>
        <p><strong>Date:</strong> ${event.event_date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Ticket Price:</strong> $${event.ticket_price}</p>
        <p><strong>Goal:</strong> $${event.goal_amount} | <strong>Raised:</strong> $${event.current_amount} (${progress}%)</p>
        <div style="width:100%; background:#eee;">
          <div style="width:${progress}%; height:20px; background:green;"></div>
        </div>
      `;
    })
    .catch(err => {
      document.getElementById('event-detail').innerHTML = '<p>Event not found.</p>';
    });
}