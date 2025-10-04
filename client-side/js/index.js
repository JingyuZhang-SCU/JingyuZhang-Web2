function formatDate(dateString) {
  if (!dateString) return '';
  if (dateString.length === 10) return dateString;
  const d = new Date(dateString);
  return isNaN(d) ? 'Invalid Date' : d.toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/events')
    .then(res => res.json())
    .then(events => {
      const container = document.getElementById('events-container');
      if (events.length === 0) {
        container.innerHTML = '<p>No upcoming events.</p>';
        return;
      }
      container.innerHTML = '';
      events.forEach(event => {
        const div = document.createElement('div');
        div.className = 'event-card';
        div.innerHTML = `
          <h3>${event.name}</h3>
          <p><strong>Date:</strong> ${formatDate(event.event_date)}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Category:</strong> ${event.category_name}</p>
          <p><strong>Ticket:</strong> $${event.ticket_price}</p>
          <a href="event-details.html?id=${event.id}">View Details</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById('events-container').innerHTML = '<p>Error loading events.</p>';
    });
});