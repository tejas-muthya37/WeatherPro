const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")


});

app.post("/", function(req, res) {

  const query = req.body.city;
  const apiKey = "740bbd4ff8f47c052291b64faca9cb30";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, function(response) {
    console.log(response);


    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherImage = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + weatherImage + "@2x.png";
      res.write("<h1>The temperature in " + req.body.city + " is " + temp + " degrees Celsius</h1>");
      res.write("<p>The weather right now is " + weatherDescription + " :D </p>");
      res.write("<img src = " + imgURL + ">");
      res.send();
      console.log(imgURL);
      console.log(weatherImage);
    });

  });
});






app.listen(3000, function() {
  console.log("SERVER up and running on localhost:3000");
});
