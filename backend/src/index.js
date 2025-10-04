const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const booksRoutes = require("./routes/booksRoutes");
const loansRoutes = require("./routes/loansRoutes");

app.use("/api", booksRoutes);
app.use("/api", authRoutes);
app.use("/api", loansRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
