// 🔹 Get logged in user
function getUser() {
  return localStorage.getItem("username");
}

// 🔹 Load all data from backend
async function loadDashboard() {
  const username = getUser();

  if (!username) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`/session/${username}`);
    const data = await res.json();

    console.log("DATA:", data);

    updateActivities(data);
    updateStats(data);
    updateChart(data);

  } catch (err) {
    console.error("Error:", err);
  }
}

// 🔹 Update Recent Activities
function updateActivities(data) {
  const container = document.querySelector(".activities-grid");

  if (!container) return;

  container.innerHTML = "";

  data.slice(-6).reverse().forEach(item => {
    const div = document.createElement("div");
    div.className = "activity-card";

    div.innerHTML = `
      <div class="activity-icon">✨</div>
      <div class="activity-name">${item.type}</div>
      <div class="activity-time">${item.duration} mins</div>
    `;

    container.appendChild(div);
  });
}

// 🔹 Update Stats (Top Cards)
function updateStats(data) {
  let total = 0;
  let sleep = 0;
  let moodSum = 0;
  let moodCount = 0;

  data.forEach(item => {
    total += Number(item.duration || 0);

    if (item.type === "sleep") {
      sleep += Number(item.duration || 0);
    }

    if (item.type === "mood") {
      moodSum += Number(item.duration || 0);
      moodCount++;
    }
  });

  const statValues = document.querySelectorAll(".stat-value");

  if (statValues.length >= 4) {
    statValues[0].innerText = data.length; // steps
    statValues[1].innerText = total; // calories
    statValues[2].innerText = moodCount
      ? (moodSum / moodCount).toFixed(1) + "/10"
      : "0/10";
    statValues[3].innerText = (sleep / 60).toFixed(1) + "h";
  }
}

// 🔹 Update Weekly Chart
function updateChart(data) {
  const bars = document.querySelectorAll(".chart-bar");

  if (!bars.length) return;

  const week = [0, 0, 0, 0, 0, 0, 0];

  data.forEach(item => {
    if (!item.date) return;

    const day = new Date(item.date).getDay();
    week[day] += Number(item.duration || 0);
  });

  const max = Math.max(...week, 1);

  bars.forEach((bar, i) => {
    bar.style.height = (week[i] / max) * 100 + "%";
  });
}

// 🔹 Login / Logout UI
function updateAuthUI() {
  const user = getUser();
  const authDiv = document.querySelector(".auth-buttons");

  if (!authDiv) return;

  if (user) {
    authDiv.innerHTML = `<button onclick="logout()">Logout</button>`;
  }
}

// 🔹 Logout
function logout() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}

// 🔹 Load everything on page load
window.onload = () => {
  updateAuthUI();
  loadDashboard();
};