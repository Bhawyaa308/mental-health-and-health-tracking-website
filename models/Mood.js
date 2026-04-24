const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  username: { type: String, required: true },

  mood: { type: String, required: true },

  // IMPORTANT for score bar
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },

  note: { type: String },

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mood", moodSchema);