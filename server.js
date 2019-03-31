// dependencies
var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio")
var axios = require("axios");
// the port on which the page will load
var PORT = 8080;
// initialize express
var app = express();
// requires all of the models
// var db = require("./models");

mongoose.connect("mongodb://localhost/scrapper", { useNewUrlParser: true });

// routes

// Get route that gets all of the articles
app.get("/scrape", function (req, res) {
  axios.get("https://www.cnn.com/us").then(function (result) {
    // console.log(result);

    // load it into cheerio
    var $ = cheerio.load(result.data);

    $("h3").each(function (i, element) {
      // empty result objects
      var resp = {};

      resp.title = $(this)
      .children("a")
      .children("span")
      .text();

      resp.link = $(this)
      .children("a")
      .attr("href");

      if(resp.link === "https:"){
        console.log("https: "+ resp.link);
      }
      else{
        resp.link = "https://www.cnn.com" + resp.link
        console.log("no https: "+resp.link);
      }

      console.log("title: "+resp.title);
      console.log("link: "+resp.link);
      // console.log(result.);
    })
    // send a message to the client
    res.send("scrape complete");
  })
})


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});