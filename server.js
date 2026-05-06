require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// MODELS
const User = require("./models/User");
const Mood = require("./models/Mood");
const Journal = require("./models/Journal");
const Session = require("./models/Session");
const Payment = require("./models/Payment");

// CONNECT ATLAS
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
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
//  LOGIN FIXED
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
        username: user.username   //  IMPORTANT FIX
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

app.post("/payment", async (req, res) => {
  try {
    console.log("BODY =", req.body);

    const data = await Payment.create(req.body);

    console.log("SAVED =", data);

    res.json(data);

  } catch (err) {
    console.log("PAYMENT ERROR =", err);
    res.status(500).json({ error: err.message });
  }
});

/////////////////////
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/chat", async (req, res) => {

  try {

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "user",
              content: req.body.message
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});