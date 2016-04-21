



var socket;
var img; 
var imgX, imgY;
 var currentImgURL = 'hex.png'; 
var up = false;
var down = false;
var arr = [];

var imgLoaded = false; 
var counter = 0; 
var queryCounter = 0; 
var queries = ["rough", "bumpy", "ridged", "smooth", "silky"];

// var imageMask;  

// var related;
var rCounter;

window.onload = function() {

  socket = io.connect(window.location.hostname);//'http://localhost:8080');
  img = loadImage(currentImgURL);  
  image(img, imgX, imgY, img.width/2, img.height/2);

  socket.on('mouse',
    function(data) {
      if(data == null){
        console.log("null data received from server:"+data);
        setTimeout(function(){ sendmouse(queries[queryCounter], true); }, 5000);
      }
      if(data != null){
        console.log("data received from server:"+data);

          arr = data; 
          img = loadImage(arr[counter]); 
          imgLoaded = true; 
          counter++;        }
          // sendmouse(queries[queryCounter], true);
    });

  sendmouse(queries[queryCounter], true);
  queryChecker();

};

function preload(){

  // imageMask = loadImage("hex.png");
  console.log("PRELOAD COMPLETE");

}

function setup() {

  createCanvas(2000, 2000);
  imgX = 100;
  imgY = 100; 
  background(255);
  rCounter = 0;
  console.log("SETUP COMPLETE");


}

function draw() {
}


function keyPressed(){
console.log(keyCode);
if(keyCode ==32) { //U - up


}
if(keyCode ==85) { //U - up
    drawImage();
} 

}

function drawImage(){
  if (imgLoaded == true) {
    console.log("image is loaded");
    // img.mask(imageMask);
    image(img, 100, 100 , 200, 200);
    imgLoaded = false; 
      if (counter<arr.length && imgLoaded ==false){ //load a new image if there is still one in the array
        img = loadImage(arr[counter]);
        console.log("new url:"+arr[counter]);
        console.log("counter:"+counter);
        imgLoaded = true; 
        counter++;
      } 
      else{ //ask bing for a new query 
        counter = 0;
        rCounter++;
        imgLoaded = false; 
        if (rCounter%2 ==0){
          sendmouse(queries[queryCounter], false);
          queryChecker();
        } else sendmouse(queries[queryCounter], false);
      }  
  }

}

function queryChecker(){
  if(queryCounter<queries.length){
    queryCounter++;
  } else queryCounter = 0;
}

function sendmouse(keyword, newSearch) {
  
  var data = {
    keyword: keyword,
    newSearch: newSearch,
  };

  socket.emit('mouse',data);
}