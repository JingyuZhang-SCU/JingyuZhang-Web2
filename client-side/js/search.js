function formatDate(dateString) {
  if (!dateString) return '';
  if (dateString.length === 10) return dateString;
  const d = new Date(dateString);
  return isNaN(d) ? 'Invalid Date' : d.toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/categories')
    .then(res => res.json())
    .then(categories => {
      const select = document.querySelector('select[name="category_id"]');
      categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = cat.name;
        select.appendChild(opt);
      });
    });

  document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    for (let [key, value] of formData.entries()) {
      if (value) params.append(key, value);
    }

    fetch(`/api/events/search?${params}`)
      .then(res => res.json())
      .then(events => {
        const container = document.getElementById('results');
        container.innerHTML = '';
        if (events.length === 0) {
          container.innerHTML = '<p>No events found.</p>';
          return;
        }
        events.forEach(e => {
          const div = document.createElement('div');
          div.className = 'event-card';
          div.innerHTML = `
            <h3>${e.name}</h3>
            <p><strong>Date:</strong> ${formatDate(e.event_date)}</p>
            <p><strong>Location:</strong> ${e.location}</p>
            <a href="event-details.html?id=${e.id}">View Details</a>
          `;
          container.appendChild(div);
        });
      });
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    document.querySelector('input[name="date"]').value = '';
    document.querySelector('input[name="location"]').value = '';
    document.querySelector('select[name="category_id"]').value = '';
    document.getElementById('results').innerHTML = '';
  });
});