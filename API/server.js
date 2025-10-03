const express = require('express');
const cors = require('cors');
const db = require('./event_db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET /api/events —— Home page activity list (active + future date)
app.get('/api/events', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT e.*, c.name AS category_name, o.name AS org_name
    FROM events e
    JOIN categories c ON e.category_id = c.id
    JOIN organisations o ON e.org_id = o.id
    WHERE e.status = 'active' AND e.event_date >= ?
    ORDER BY e.event_date ASC
  `;
  db.query(query, [today], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/categories —— All categories (for use in the search dropdown box)
app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/events/search —— Search by conditions
app.get('/api/events/search', (req, res) => {
  let { date, location, category_id } = req.query;
  let query = `
    SELECT e.*, c.name AS category_name, o.name AS org_name
    FROM events e
    JOIN categories c ON e.category_id = c.id
    JOIN organisations o ON e.org_id = o.id
    WHERE e.status = 'active'
  `;
  const params = [];

  if (date) {
    query += ' AND e.event_date = ?';
    params.push(date);
  }
  if (location) {
    query += ' AND e.location LIKE ?';
    params.push(`%${location}%`);
  }
  if (category_id && category_id !== '0') {
    query += ' AND e.category_id = ?';
    params.push(category_id);
  }

  query += ' ORDER BY e.event_date ASC';

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/events/:id —— Details of a single activity
app.get('/api/events/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT e.*, c.name AS category_name, o.name AS org_name, o.mission, o.contact_email
    FROM events e
    JOIN categories c ON e.category_id = c.id
    JOIN organisations o ON e.org_id = o.id
    WHERE e.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});