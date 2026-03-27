const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

const USERNAME = "jab_photography29"; // Instagram Username

app.get("/follower", async (req, res) => {
  try {
    const url = `https://www.instagram.com/${USERNAME}/?__a=1&__d=dis`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0" // wichtig, sonst blockiert Instagram
      }
    });

    const followers = response.data.graphql.user.edge_followed_by.count;
    res.send(followers.toString());
  } catch (err) {
    console.error(err.message);
    res.send("Fehler beim Abrufen");
  }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
