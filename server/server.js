const express = require('express');
const app = express();
const axios = require('axios');
const port = 5500;
const apiKey = "b389ed0c-d634-4243-841d-f38788db5e9c";

app.get("/", (request, response) => {
    axios
      .get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=10", {
        headers: {
          "X-CMC_PRO_API_KEY": `${apiKey}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

app.listen(port, () => {
    console.log(`server listening on port ${port}`); 
})