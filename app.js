const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "95950fddffd37fdebaaabfa1aca1e10a";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
  
  https.get(url, response => {
    console.log(response.statusCode);
  
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const main = weatherData.main;
      // const visibility = weatherData.visibility;
      const wind = weatherData.wind;

      
      res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      res.write(`<p>The temperature in ${query} is ${temp} degree Celcius.</p>`);
      res.write(`<img src="${imageUrl}">`);
      const getDetail = prop => {
        for (let [key, value] of Object.entries(prop)) {
          res.write(`<p>${key}: ${value}</p>`);
        }
      }
      getDetail(main);
      getDetail(wind);
      
      res.send();
    })
  })
 
})





app.listen(3000, () => {
  console.log("Server is running on port 3000.");
})