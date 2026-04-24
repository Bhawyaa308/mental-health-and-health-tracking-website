const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  username: { type: String, index: true }, // 🔥 index
  type: String,
  duration: Number,
  tags: [String], // 🔥 ARRAY CONCEPT
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Session", sessionSchema);