const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://bhawyaa107_db_user:EG5ooZtO53e177jk@cluster1.wzuibjh.mongodb.net/mindfulness"
)
.then(async () => {
  console.log("✅ MongoDB Connected");

  const JournalSchema = new mongoose.Schema({}, { strict: false });
  const Journal = mongoose.model("JournalSeed", JournalSchema, "journals");

  await Journal.deleteMany({});
  console.log("🗑 Old journal data deleted");

  const users = [
    "bhawyaa garg",
    "autoUser1776222077854",
    "autoUser1776222751328",
    "Manit",
    "simran24",
    "aman08",
    "riya17",
    "karan99"
  ];

  const entries = [
    {
      text: "Had a peaceful morning walk and felt refreshed for the day.",
      mood: "calm",
      tags: ["morning"]
    },
    {
      text: "Felt stressed because of deadlines but managed it well.",
      mood: "stressed",
      tags: ["work"]
    },
    {
      text: "Spent quality time with family and felt grateful today.",
      mood: "happy",
      tags: ["family"]
    },
    {
      text: "Low energy today, need more rest and better sleep.",
      mood: "tired",
      tags: ["health"]
    },
    {
      text: "Completed my goals today and feel very proud.",
      mood: "motivated",
      tags: ["success"]
    },
    {
      text: "Overthinking too much today, need to slow down.",
      mood: "anxious",
      tags: ["mind"]
    },
    {
      text: "Meditation helped me feel more balanced and relaxed.",
      mood: "peaceful",
      tags: ["meditation"]
    },
    {
      text: "A small act of kindness made my whole day better.",
      mood: "joyful",
      tags: ["gratitude"]
    },
    {
      text: "Missed a few goals today but tomorrow is a new chance.",
      mood: "hopeful",
      tags: ["growth"]
    },
    {
      text: "Felt emotionally heavy today and needed some quiet time.",
      mood: "sad",
      tags: ["reflection"]
    }
  ];

  const data = [];

  users.forEach((username, uIndex) => {
    const count = 6 + (uIndex % 5); // gives 6 to 10 entries

    for (let i = 0; i < count; i++) {
      const chosen = entries[(uIndex + i) % entries.length];

      const date = new Date("2026-04-01T09:00:00Z");
      date.setDate(date.getDate() + i * 3 + uIndex);

      data.push({
        username: username,
        text: chosen.text,
        mood: chosen.mood,
        tags: chosen.tags,
        date: date
      });
    }
  });

  await Journal.insertMany(data);

  console.log(`✅ ${data.length} journal records inserted successfully`);
  process.exit();
})
.catch(err => {
  console.log("❌ Error:", err);
});