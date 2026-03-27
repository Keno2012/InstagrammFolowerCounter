const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const USERNAME = "instagram"; // erstmal testen!

app.get("/", (req, res) => {
  res.send("Server läuft!");
});

app.get("/follower", async (req, res) => {
  try {
    const url = `https://www.instagram.com/${USERNAME}/?__a=1&__d=dis`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
      }
    });

    const data = response.data;

    // 🔍 Sicher prüfen (SEHR WICHTIG)
    if (
      data &&
      data.graphql &&
      data.graphql.user &&
      data.graphql.user.edge_followed_by
    ) {
      const followers = data.graphql.user.edge_followed_by.count;
      res.send(followers.toString());
    } else {
      console.log("Antwort war kein gültiges JSON:");
      console.log(JSON.stringify(data).substring(0, 300));
      res.send("0");
    }

  } catch (err) {
    console.error("Fehler:", err.message);
    res.send("0");
  }
});

app.listen(PORT, () => console.log("Server läuft"));
