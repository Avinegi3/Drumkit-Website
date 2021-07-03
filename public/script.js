//jshint esversion:6
const button = document.querySelectorAll(".drum").length;
const drum=document.querySelectorAll(".drum");
const challengep=document.querySelector(".challengep");
const recordp =document.querySelector(".recordp");
const savep = document.querySelector(".savep");
const track = document.querySelectorAll(".t1").length;
const recordButton = document.querySelector(".record");
const songlink = document.querySelector(".songlink");
const play = document.querySelector(".play");
const save = document.querySelector(".save");

var userClicked=[];
var gamePattern=[];
var level=0;
var started =false;

let recordStartTime;
let recording=[];
let recordedItem;




recordButton.addEventListener("click", function(){
    recordp.style.display="block";
     startRecording();

});


function startRecording(){
recordStartTime=Date.now();
for (var i=0;; i++) {
document.querySelectorAll(".drum")[i].addEventListener("click", function() {

      recordedItem = this.innerHTML;
     recording.push({
       key: recordedItem,
       startTime: Date.now()-recordStartTime
     });

});
}

}
play.addEventListener("click", function (){
  if (recording.length === 0) return;
  recording.forEach(recordedItem => {
    setTimeout(() => {
      makesound(recordedItem.key);
      animation(recordedItem.key);
    }, recordedItem.startTime);
  });
  });

  save.addEventListener("click", function(){
      savep.style.display="block";
      axios.post("/songs",{recording: recording}).then(res =>{
        songlink.href = `/songs/${res.data._id})`;

        });
  });



for( var j=0;j<track;j++){
  document.querySelectorAll(".t1")[j].addEventListener("click", function(){
      var tracks =this.innerHTML;
      console.log(tracks);
        switch (tracks) {
           case "🎵 Track 1":
                  var poc= new Audio("/sounds/poc.mp3");
                  poc.play();
            break;
            case "🎵 Track 2":
                    var scam= new Audio("/sounds/scam.mp3");
                    scam.play();
              break;
              case "🎵 Track 3":
                      var tenet= new Audio("/sounds/tenet.mp3");
                      tenet.play();
                break;
          default:
        }
  });
}


document.addEventListener("keypress", function(event){

    makesound(event.key);
    animation(event.key);
 });

document.querySelector(".challenge").addEventListener("click" ,function(){
    challengep.style.display="block";
   next();
    started=true;
 });

 function next(){
   userClicked=[];

        var buttonArr=["w","a","s","d","j","k","l"];

      var randomnum = Math.random()*7;
       randomnum = Math.floor(randomnum);

       var randomchosen=buttonArr[randomnum];

       gamePattern.push(randomchosen);
       makesound(randomchosen);
       animation(randomchosen);
       document.querySelector("#Title").innerHTML="Level "+level;

       level++;

}

for (var i=0; ; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

     var user = this.innerHTML;
      makesound(user);
      animation(user);
      userClicked.push(user);
      check(userClicked.length-1);

      });
}

function check(level){
  if(gamePattern[level]===userClicked[level]){
    if(gamePattern.length===userClicked.length){
      setTimeout(function(){
        next();
      },1000);
    }
  }
  else{
    if(started){
      wrong();
    document.querySelector("#Title").innerHTML="Game-Over";
    start();
  }
  }
}

function start(){
  level =0;
  newArr=[];
  started=false;
}


      function animation(key){
        var activeButton = document.querySelector("."+ key);
        activeButton.classList.add("pressed");
        setTimeout(function () {
          activeButton.classList.remove("pressed");
        }, 150);
        }

      function makesound(key){

        switch (key) {
          case "w":
            var tom1= new Audio("/sounds/tom-1.mp3");
            tom1.play();
            break;
            case "a":
              var tom2= new Audio("/sounds/tom-2.mp3");
              tom2.play();
              break;
              case "s":
              var tom3= new Audio("/sounds/tom-3.mp3");
              tom3.play();
              break;
              case "d":
              var tom4= new Audio("/sounds/tom-4.mp3");
              tom4.play();
              break;
              case "j":
              var crash= new Audio("/sounds/crash.mp3");
              crash.play();
              break;
              case "k":
              var kick= new Audio("/sounds/kick-bass.mp3");
              kick.play();
              break;
              case "l":
              var snare= new Audio("/sounds/snare.mp3");
              snare.play();
              break;

          default: wrong();

        }
      }

      function wrong(){
        var wrong =new Audio("/sounds/wrong.mp3");
        wrong.play();
        document.querySelector("#Title").innerHTML="Wrong key pressed";
      }
