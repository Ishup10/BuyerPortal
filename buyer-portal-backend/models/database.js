const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  //  Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'buyer'
  )`);

  //  Properties table
  db.run(`CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    location TEXT NOT NULL
  )`);

  //  Favourites table
  db.run(`CREATE TABLE IF NOT EXISTS favourites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    property_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(property_id) REFERENCES properties(id)
  )`);

  // Seed properties if empty
  db.get("SELECT count(*) as count FROM properties", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO properties (title, price, location) VALUES (?, ?, ?)");
      stmt.run('Modern Apartment', '$250,000', 'Kathmandu');
      stmt.run('Heritage Home', '$450,000', 'Lalitpur');
      stmt.run('Luxury Villa', '$800,000', 'Pokhara');
      stmt.run('Cozy Studio', '$120,000', 'Bhaktapur');
      stmt.finalize();
    }
  });
});

module.exports = db;