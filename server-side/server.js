const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./event_db'); // Database connection

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from client-side directory
app.use(express.static(path.join(__dirname, '..', 'client-side')));

// Root route - serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client-side', 'index.html'));
});

// API Endpoint: Get all active upcoming events
app.get('/api/events', (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Current date
  
  // SQL query to get active events from today onwards
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

// API Endpoint: Get all categories
app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// API Endpoint: Search events with filters
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

  // Build query based on provided filters
  if (date) {
    query += ' AND e.event_date = ?';
    params.push(date);
  }
  if (location) {
    query += ' AND e.location LIKE ?';
    params.push(`%${location}%`);
  }
  if (category_id) {
    query += ' AND e.category_id = ?';
    params.push(category_id);
  }
  query += ' ORDER BY e.event_date ASC';

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// API Endpoint: Get specific event by ID
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Homepage: http://localhost:${PORT}/`);
  console.log(`API test: http://localhost:${PORT}/api/events`);
});