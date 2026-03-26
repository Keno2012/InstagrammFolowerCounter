const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const USERNAME = "jab_photography29"; // <-- hier einsetzen

app.get("/", (req, res) => {
  res.send("Server läuft! Nutze /follower für die Follower-Zahl.");
});

app.get("/follower", async (req, res) => {
  try {
    const url = `https://www.instagram.com/${USERNAME}/`;
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = response.data;
    console.log(html.substring(0, 500));
    const match = html.match(/"edge_followed_by":\{"count":(\d+)\}/);

    if (match && match[1]) {
      res.send(match[1]);
    } else {
      res.send("Fehler beim Parsen");
    }
  } catch (err) {
    console.error(err.message);
    res.send("Request Fehler");
  }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
