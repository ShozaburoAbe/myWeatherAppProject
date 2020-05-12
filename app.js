const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res) => {

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Yokohama&appid=95950fddffd37fdebaaabfa1aca1e10a&units=metric";

  https.get(url, response => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const main = weatherData.main;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      res.write(`<h1>The temperature in Yokohama is ${temp} degree Celcius.</h1>`);
      res.write(`<img src="${imageUrl}">`);
      res.send();
    })
  })

})





app.listen(3000, () => {
  console.log("Server is running on port 3000.");
})