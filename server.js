//jshint esversion:8
 const express = require('express');
 const mongoose = require("mongoose");

 const Song = require("./songdb.js");
 const app = express();

  mongoose.connect("mongodb://localhost/songdb",{ useNewUrlParser: true , useUnifiedTopology: true}); // database name songdb

app.set("view engine","ejs");
app.use(express.json());
app.use(express.static("public"));

 app.get("/", function(req ,res){
   res.render("index.ejs");
 });

 app.post("/songs", async function (req, res){
    const song = new Song({
      notes: req.body.recording
    });

    await song.save();

    res.json(song);

 });

 app.get("/songs/:id", async (req, res) => {
   let song;
   try {
     song = await Song.findById(req.params.id);
   } catch (e) {
     song = undefined;
   }
   res.render("index.ejs", {song:song});

 });



 app.listen(3000, function(){
   console.log("Listening");
 });
