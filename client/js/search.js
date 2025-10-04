document.addEventListener('DOMContentLoaded', () => {
  // Load categories
  fetch('http://localhost:3000/api/categories')
    .then(res => res.json())
    .then(categories => {
      const select = document.getElementById('category');
      categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = cat.name;
        select.appendChild(opt);
      });
    });

  // Search form
  document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    for (let [key, value] of formData.entries()) {
      if (value && value !== '0') params.append(key, value);
    }

    fetch(`http://localhost:3000/api/events/search?${params}`)
      .then(res => res.json())
      .then(events => {
        const container = document.getElementById('results');
        container.innerHTML = '';
        if (events.length === 0) {
          container.innerHTML = '<p class="empty">No events match your search.</p>';
          return;
        }
        events.forEach(e => {
          const date = new Date(e.event_date).toLocaleDateString('en-AU');
          const div = document.createElement('div');
          div.className = 'event-card';
          div.innerHTML = `
            <h3>${e.name}</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Location:</strong> ${e.location}</p>
            <p><strong>Category:</strong> ${e.category_name}</p>
            <a href="event.html?id=${e.id}">View Details</a>
          `;
          container.appendChild(div);
        });
      })
      .catch(err => {
        document.getElementById('results').innerHTML = '<p class="error">Search failed.</p>';
        console.error(err);
      });
  });

  // Clear button
  document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('date').value = '';
    document.getElementById('location').value = '';
    document.getElementById('category').value = '0';
    document.getElementById('results').innerHTML = '';
  });
});