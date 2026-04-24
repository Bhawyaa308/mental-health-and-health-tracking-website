const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  username: { type: String, required: true },

  // main content
  text: { type: String, required: true },

  // optional title / mood
  mood: { type: String },

  // tags for chips UI
  tags: [String],

  // timestamps
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Journal", journalSchema);