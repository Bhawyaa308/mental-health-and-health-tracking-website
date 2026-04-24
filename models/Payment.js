const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  username: { type: String, required: true },

  sessionName: { type: String },
  amount: { type: Number, required: true },

  cardName: { type: String },

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);