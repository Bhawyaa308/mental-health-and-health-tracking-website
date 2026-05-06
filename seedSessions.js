const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://bhawyaa107_db_user:EG5ooZtO53e177jk@cluster1.wzuibjh.mongodb.net/mindfulness"
)
.then(async () => {
  console.log("MongoDB Connected");

  const PaymentSchema = new mongoose.Schema({}, { strict: false });
  const Payment = mongoose.model("PaymentSeed", PaymentSchema, "payments");

  await Payment.deleteMany({});
  console.log("Old payment data deleted");

  const users = [
    {
      username: "bhawyaa garg",
      holder: "Bhawyaa Garg",
      type: "VISA",
      last4: "3456",
      expiry: "12/28"
    },
    {
      username: "autoUser1776222077854",
      holder: "Automation User",
      type: "MasterCard",
      last4: "2184",
      expiry: "11/27"
    },
    {
      username: "autoUser1776222751328",
      holder: "Automation User",
      type: "AMEX",
      last4: "6721",
      expiry: "10/29"
    },
    {
      username: "Manit",
      holder: "Manit Garg",
      type: "VISA",
      last4: "4821",
      expiry: "09/28"
    },
    {
      username: "simran24",
      holder: "Simran Kaur",
      type: "DISC",
      last4: "9045",
      expiry: "08/27"
    },
    {
      username: "aman08",
      holder: "Aman Verma",
      type: "MasterCard",
      last4: "5512",
      expiry: "01/30"
    },
    {
      username: "riya17",
      holder: "Riya Sharma",
      type: "VISA",
      last4: "7734",
      expiry: "06/29"
    },
    {
      username: "karan99",
      holder: "Karan Malhotra",
      type: "AMEX",
      last4: "6619",
      expiry: "03/28"
    }
  ];

  const plans = [
    { sessionName: "Morning Meditation Circle", amount: 300 },
    { sessionName: "Personal Therapy Session", amount: 500 },
    { sessionName: "Stress Management Mastery", amount: 700 },
    { sessionName: "Mindful Movement Class", amount: 500 },
    { sessionName: "Life Coaching Session", amount: 800 },
    { sessionName: "Evening Relaxation Circle", amount: 650 }
  ];

  const data = [];

  users.forEach((user, index) => {

    // one user only premium package
    if (index === 0) {
      data.push({
        username: user.username,
        sessionName: "Unlimited Wellness Subscription",
        amount: 8200,

        card: {
          holderName: user.holder,
          type: user.type,
          last4: user.last4,
          expiry: user.expiry
        },

        security: {
          cvvEntered: true,
          paymentMode: "Card"
        },

        status: "Paid",
        date: new Date("2026-04-25T10:00:00Z")
      });

      return;
    }

    // others get 3 to 5 purchases
    const count = 3 + (index % 3); // 3,4,5

    for (let i = 0; i < count; i++) {
      const plan = plans[(index + i) % plans.length];

      const dt = new Date("2026-04-01T10:00:00Z");
      dt.setDate(dt.getDate() + (index * 3) + i * 4);

      data.push({
        username: user.username,
        sessionName: plan.sessionName,
        amount: plan.amount,

        card: {
          holderName: user.holder,
          type: user.type,
          last4: user.last4,
          expiry: user.expiry
        },

        security: {
          cvvEntered: true,
          paymentMode: "Card"
        },

        status: "Paid",
        date: dt
      });
    }
  });

  await Payment.insertMany(data);

  console.log(` ${data.length} payment records inserted`);
  process.exit();
})
.catch(err => {
  console.log(" Error:", err);
});