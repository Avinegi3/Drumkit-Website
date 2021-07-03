//jshint esversion:6
// daatabase name - songdb

const moongoose = require("mongoose");

  const notesSchema= new moongoose.Schema({
    key: {
      type: String,
      required:true           //validation
  },
    startTime :{
      type: Number,
      required:true
  }
  });

  const songSchema= new moongoose.Schema({
        notes :[notesSchema]
  });

 module.exports = moongoose.model("Songs",songSchema); //collection name - Song
