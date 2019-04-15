// dependencies
var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio")
var axios = require("axios");
// var pug = require("pug");

// requires all of the models
var db = require("./models");

// the port on which the page will load
var PORT = 8080;
// initialize express
var app = express();

app.set('view engine', 'pug')

app.use(express.static(__dirname + '/public'));


mongoose.connect("mongodb://localhost/scrapper", { useNewUrlParser: true });

// routes

// root
app.get("/", function (req, res){
  res.render("index",{title: "Article Scraper"})
})
// Home page without any articles 
app.get("/home", function(req, res){
  res.render("index", {title: "Article Scraper"})
})

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// deletes the articles scraped from the database
app.get("/clear", function (req, res){
  db.articles.drop(); 
})
// api calls
// Get route that gets all of the articles
app.get("/scrape", function (req, res) {
  // res.render("index", {title: "Article Scraper"})
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

      if(resp.link.startsWith("https:")){
        // console.log("link: "+ resp.link);
      }
      else{
        resp.link = "https://www.cnn.com" + resp.link
        // console.log("no https: "+resp.link);
      }

      // console.log("title: "+resp.title);
      // console.log("link: "+resp.link);
      // console.log(result.);

      db.Article.create(resp)
      .then(function(dbArticle){
        // logs the new article
        // console.log(dbArticle);
      })
      .catch(function(err){
      // this log the eer if an error occurred
        // console.log(err);
      })
    })
    // send a message to the client
    // res.alert("scrape complete");  
  })
})



// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});