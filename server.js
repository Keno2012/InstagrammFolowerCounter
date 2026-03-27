const axios = require("axios");

const USERNAME = "instagram"; // Test-Account
const url = `https://www.instagram.com/${USERNAME}/?__a=1&__d=dis`;

axios.get(url, {
  headers: { 
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36" 
  }
})
.then(res => {
  const followers = res.data.graphql.user.edge_followed_by.count;
  console.log("Follower:", followers);
})
.catch(err => {
  console.error("Fehler beim Abrufen:", err.response ? err.response.data : err.message);
});
