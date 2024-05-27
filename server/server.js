const express = require('express');
const app = express();
const axios = require('axios');
const port = 5500;
const apiKey = "b389ed0c-d634-4243-841d-f38788db5e9c";

app.get("/api", (req, res) => {
    axios
      .get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10", {
        headers: {
          "X-CMC_PRO_API_KEY": `${apiKey}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        res.json(response.data) // sends json data to localhost
      })
      .catch((error) => {
        console.log(error);
      });
  });

app.listen(port, () => {
    console.log(`server listening on port ${port}`); 
})