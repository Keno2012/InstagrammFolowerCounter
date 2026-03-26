const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const USERNAME = "jab_photography29"; // <-- eintragen

app.get("/", (req, res) => {
  res.send("Server läuft! /follower nutzen");
});

app.get("/follower", async (req, res) => {
  try {
    const targetUrl = `https://www.instagram.com/${USERNAME}/`;

    // 🔥 Proxy API (allorigins)
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

    const response = await axios.get(proxyUrl);

    const html = response.data;

    console.log("HTML Preview:", html.substring(0, 300));

    let followers = null;

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

    if (!followers) followers = "0";

    res.send(followers);

  } catch (err) {
    console.error(err.message);
    res.send("0");
  }
});

app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));
