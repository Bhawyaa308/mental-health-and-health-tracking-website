const mongoose = require("mongoose");

if (mongoose.models.Payment) {
  delete mongoose.models.Payment;
}

const PaymentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  sessionName: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  card: {
    holderName: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    last4: {
      type: String,
      required: true
    },

    expiry: {
      type: String,
      required: true
    }
  },

  security: {
    cvvEntered: {
      type: Boolean,
      default: true
    },

    paymentMode: {
      type: String,
      default: "Card"
    }
  },

  status: {
    type: String,
    default: "Paid"
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);