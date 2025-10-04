const mysql = require('mysql2');

// Create MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password123',
  database: 'charityevents_db'
});

// Connect to database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to charityevents_db');
});

// Export database connection for use in other files
module.exports = db;