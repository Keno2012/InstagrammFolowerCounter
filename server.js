const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const USERNAME = "jab_photography29"; // <-- eintragen

app.get("/", (req, res) => {
  res.send("Server läuft!");
});

app.get("/follower", async (req, res) => {
  try {
    const response = await axios.get(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`,
      {
        headers: {
          "User-Agent": "Instagram 219.0.0.12.117 Android"
        }
      }
    );

    const followers =
      response.data.data.user.edge_followed_by.count;

    res.send(followers.toString());

  } catch (err) {
    console.error("Fehler:", err.message);
    res.send("0");
  }
});

app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));
