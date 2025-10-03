document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/events')
    .then(res => res.json())
    .then(events => {
      const container = document.getElementById('events-container');
      if (events.length === 0) {
        container.innerHTML = '<p>No upcoming events.</p>';
        return;
      }
      events.forEach(event => {
        const div = document.createElement('div');
        div.className = 'event-card';
        div.innerHTML = `
          <h3>${event.name}</h3>
          <p><strong>Date:</strong> ${event.event_date}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Category:</strong> ${event.category_name}</p>
          <p><strong>Ticket:</strong> $${event.ticket_price}</p>
          <a href="event.html?id=${event.id}">View Details</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById('events-container').innerHTML = '<p>Error loading events.</p>';
      console.error(err);
    });
});