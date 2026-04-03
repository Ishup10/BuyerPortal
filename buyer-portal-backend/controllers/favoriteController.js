const db = require("../models/database");

exports.getFavorites = (req, res) => {
  const sql = `SELECT id, property_id FROM favourites WHERE user_id = ?`;

  db.all(sql, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(rows);
  });
};

exports.addFavorite = (req, res) => {
  const { property_id } = req.body;

  if (!property_id) {
    return res.status(400).json({ message: "Property ID is required" });
  }

  const checkSql = `SELECT * FROM favourites WHERE user_id = ? AND property_id = ?`;
  db.get(checkSql, [req.user.id, property_id], (err, row) => {
    if (row)
      return res.status(400).json({ message: "Property already in favorites" });

    const sql = `INSERT INTO favourites (user_id, property_id) VALUES (?, ?)`;
    db.run(sql, [req.user.id, property_id], function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to add favorite" });
      }
      res.status(201).json({ message: "Added to favourites", id: this.lastID });
    });
  });
};

exports.removeFavorite = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM favourites WHERE id = ? AND user_id = ?`;

  db.run(sql, [id, req.user.id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (this.changes === 0) {
      return res
        .status(404)
        .json({ message: "Favorite not found or unauthorized" });
    }
    res.json({ message: "Removed from favourites" });
  });
};
