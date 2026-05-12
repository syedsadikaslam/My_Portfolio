require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

/* ==============================
   MIDDLEWARE
================================ */

// ✅ CORS – SAFE & PRODUCTION READY
app.use(
  cors({
    origin: [
      "https://sadikaslam.in",
      "https://www.sadikaslam.in",
      "https://sadik-portfolio-v2.vercel.app", // Added common default if Vercel is used
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ==============================
   DATABASE CONNECTION
================================ */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ==============================
   ROUTES
================================ */

const mediumRouter = require("./routes/MediumRoutes");
const reviewRouter = require("./routes/ReviewRoutes");

app.use("/api/medium", mediumRouter);
app.use("/api/reviews", reviewRouter);

/* ==============================
   HEALTH CHECK
================================ */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Portfolio API is running",
  });
});

/* ==============================
   SERVER START
================================ */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
