fetch('http://localhost:3000/api/categories')
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

  fetch(`http://localhost:3000/api/events/search?${params}`)
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
        div.innerHTML = `<h3>${e.name}</h3><p>${e.location} on ${e.event_date}</p><a href="event.html?id=${e.id}">Details</a>`;
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