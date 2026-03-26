const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const USERNAME = "jab_photography29"; // <-- hier eintragen

// zufällige kleine Pause (Anti-Bot)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get("/", (req, res) => {
  res.send("Server läuft! Nutze /follower");
});

app.get("/follower", async (req, res) => {
  try {
    // kleine zufällige Verzögerung (wichtiger Trick!)
    await sleep(1500 + Math.random() * 2000);

    const response = await axios.get(
      `https://www.instagram.com/${USERNAME}/`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
          "Upgrade-Insecure-Requests": "1",
          "Referer": "https://www.google.com/",
          "DNT": "1"
        }
      }
    );

    const html = response.data;

    // 🔍 Debug (optional)
    console.log("HTML Preview:", html.substring(0, 300));

    let followers = null;

    // 🔹 mehrere Parser (wichtig!)
    let match = html.match(/"edge_followed_by":\{"count":(\d+)\}/);
    if (match) followers = match[1];

    if (!followers) {
      match = html.match(/"followers":\{"count":(\d+)\}/);
      if (match) followers = match[1];
    }

    if (!followers) {
      match = html.match(/"userInteractionCount":"(\d+)"/);
      if (match) followers = match[1];
    }

    if (!followers) {
      // fallback → damit ESP32 nicht abstürzt
      followers = "0";
    }

    res.send(followers);

  } catch (err) {
    console.error("Fehler:", err.message);
    res.send("0"); // fallback
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
