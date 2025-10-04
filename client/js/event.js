document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  if (!eventId) {
    document.getElementById('event-detail').innerHTML = '<p class="error">Invalid event ID.</p>';
    return;
  }

  fetch(`http://localhost:3000/api/events/${eventId}`)
    .then(res => res.json())
    .then(event => {
      const date = new Date(event.event_date).toLocaleDateString('en-AU');
      const ticket = event.ticket_price == 0 ? 'Free' : '$' + event.ticket_price;
      const progress = ((event.current_amount / event.goal_amount) * 100).toFixed(1);
      const goal = event.goal_amount.toLocaleString();
      const raised = event.current_amount.toLocaleString();

      document.getElementById('event-detail').innerHTML = `
        <h1>${event.name}</h1>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Ticket:</strong> ${ticket}</p>
        <p><strong>Goal:</strong> $${goal} | <strong>Raised:</strong> $${raised} (${progress}%)</p>
        <div class="progress-bar">
          <div class="progress-fill" style="--progress: ${progress}%"></div>
        </div>
      `;

      document.getElementById('register-btn').onclick = () => {
        alert('This feature is currently under construction.');
      };
    })
    .catch(err => {
      document.getElementById('event-detail').innerHTML = '<p class="error">Event not found or server error.</p>';
      console.error(err);
    });
});