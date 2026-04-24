const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

// MODELS
const User = require("./models/User");
const Mood = require("./models/Mood");
const Journal = require("./models/Journal");
const Session = require("./models/Session");
const Payment = require("./models/Payment");

// CONNECT ATLAS
mongoose.connect(
  "mongodb+srv://bhawyaa107_db_user:EG5ooZtO53e177jk@cluster1.wzuibjh.mongodb.net/mindfulness?retryWrites=true&w=majority"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

/////////////////////
// AUTH
/////////////////////

app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ message: "Registered Successfully" });
  } catch {
    res.status(400).json({ error: "User exists" });
  }
});

/////////////////////
// 🔥 LOGIN FIXED
/////////////////////

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password
    });

    if (user) {
      res.json({
        message: "Login Successful",
        username: user.username   // ✅ IMPORTANT FIX
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/////////////////////
// SESSION CRUD
/////////////////////

app.post("/session", async (req, res) => {
  const data = await Session.create(req.body);
  res.json(data);
});

app.get("/session/:username", async (req, res) => {
  const data = await Session.find({ username: req.params.username });
  res.json(data);
});

/////////////////////
// FILTER
/////////////////////

app.get("/session/filter/:username/:range", async (req, res) => {
  const { username, range } = req.params;

  let startDate = new Date();
  let endDate = new Date();

  if (range === "today") startDate.setHours(0,0,0,0);
  else if (range === "week") startDate.setDate(startDate.getDate()-7);
  else if (range === "month") startDate.setMonth(startDate.getMonth()-1);
  else if (range === "year") startDate.setFullYear(startDate.getFullYear()-1);

  const data = await Session.find({
    username,
    date: { $gte: startDate, $lte: endDate }
  });

  res.json(data);
});

/////////////////////
// MENTAL HEALTH
/////////////////////

// SAVE MOOD
app.post("/mood", async (req, res) => {
  try {
    const data = await Mood.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET MOODS
app.get("/mood/:username", async (req, res) => {
  const data = await Mood.find({ username: req.params.username })
    .sort({ date: -1 });

  res.json(data);
});

// SAVE JOURNAL
app.post("/journal", async (req, res) => {
  try {
    const data = await Journal.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET JOURNALS
app.get("/journal/:username", async (req, res) => {
  const data = await Journal.find({ username: req.params.username })
    .sort({ date: -1 });

  res.json(data);
});

// DELETE JOURNAL
app.delete("/journal/:id", async (req, res) => {
  await Journal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/////////////////////
// PAYMENT SAVE
/////////////////////

app.post("/payment", async (req, res) => {
  try {
    const data = await Payment.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/////////////////////
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});