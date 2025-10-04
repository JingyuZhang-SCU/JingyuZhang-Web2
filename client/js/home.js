document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/events')
    .then(res => res.json())
    .then(events => {
      const container = document.getElementById('events-container');
      if (events.length === 0) {
        container.innerHTML = '<p class="empty">No upcoming events at the moment.</p>';
        return;
      }
      events.forEach(event => {
        const date = new Date(event.event_date).toLocaleDateString('en-AU');
        const ticket = event.ticket_price == 0 ? 'Free' : '$' + event.ticket_price;
        const div = document.createElement('div');
        div.className = 'event-card';
        div.innerHTML = `
          <h3>${event.name}</h3>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Category:</strong> ${event.category_name}</p>
          <p><strong>Ticket:</strong> ${ticket}</p>
          <a href="event.html?id=${event.id}">View Details</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById('events-container').innerHTML = '<p class="error">Failed to load events.</p>';
      console.error(err);
    });
});