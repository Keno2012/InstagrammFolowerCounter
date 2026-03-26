const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const USERNAME = "jab_photography29";

app.get("/follower", async (req, res) => {
  try {
    const url = `https://www.instagram.com/${USERNAME}/`;
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = response.data;

    const match = html.match(/"edge_followed_by":\{"count":(\d+)\}/);

    if (match && match[1]) {
      res.send(match[1]); // Zahl zurückgeben
    } else {
      res.status(500).send("Fehler beim Parsen"); // <--- hier vorher Fehler
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Request Fehler");
  }
});
