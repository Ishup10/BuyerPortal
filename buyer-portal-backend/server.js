require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/database");

const app = express();


app.use(cors());
app.use(express.json()); 


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
