const db = require("../models/database");

exports.getAllProperties = (req, res) => {
  const sql = "SELECT * FROM properties";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching properties", error: err.message });
    }
    res.json(rows);
  });
};

exports.getPropertyById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM properties WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(row);
  });
};

exports.createProperty = (req, res) => {
  const { title, price, location } = req.body;

  if (!title || !price || !location) {
    return res
      .status(400)
      .json({ message: "Please provide title, price, and location" });
  }

  const sql =
    "INSERT INTO properties (title, price, location) VALUES (?, ?, ?)";
  db.run(sql, [title, price, location], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating property", error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      title,
      price,
      location,
      message: "Property created successfully",
    });
  });
};

exports.updateProperty = (req, res) => {
  const { id } = req.params;
  const { title, price, location } = req.body;

  const sql = `UPDATE properties SET title = ?, price = ?, location = ? WHERE id = ?`;

  db.run(sql, [title, price, location, id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating property", error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property updated successfully", id });
  });
};

exports.deleteProperty = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM properties WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting property", error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  });
};
