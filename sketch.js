var socket;
var img, imgX, imgY;

var data;
var urlArray = [];

var counter = 0;
setCounter = 0;

function urlCheck(){
 if(counter+1<urlArray.length){
  counter++;
 } else{ counter = 0;
    setCheck();

 }
  img = urlArray[counter].img;
}
function setCheck(){
 if(setCounter<2){
  setCounter++;
 } else setCounter = 0;
  data = $.getJSON( "data.json", function(data) {
    console.log( "success" );
       console.log("data: "+data);
      urlArray = data[setCounter].urls;
      console.log("urlarray: "+urlArray);
      img = urlArray[counter].img;
     $("#currentimg").attr("src", img);

    })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
  });
}

window.onload = function() {

  data = $.getJSON( "data.json", function(data) {
    console.log( "success" );
       console.log("data: "+data);
      urlArray = data[0].urls;
      console.log("urlarray: "+urlArray);
      img = urlArray[counter].img;
     $("#currentimg").attr("src", img);

    })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
  });

  socket = io.connect('http://localhost:5000');
  // img = loadImage(currentImgURL);  
  // image(img, imgX, imgY, img.width img.height);

  socket.on('mouse',
    function(data) {
      if(data == null){
        console.log("null data received from server:"+data);
        setTimeout(function(){ 
          // sendmouse(queries[queryCounter], true); 
        }, 5000);
      }
      if(data != null){
        console.log("data received from server:"+data);

       
        }
    });

  
  $("#imgcontainer").on("swiperight",function(){
      console.log("RIGHT");
     

      $("#currentimg").addClass('rotate-left').delay(700).fadeOut(1);  
      $("#currentimg").attr("id","old-img");

       urlCheck();
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
  });

  $("#imgcontainer").on("swipeleft",function(){
      console.log("LEFT");
     

      $("#currentimg").addClass('rotate-right').delay(700).fadeOut(1);  
      $("#currentimg").attr("id","old-img");

       urlCheck();
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
  });

 
  $("#imgcontainer").on("swipeup",function(){
      console.log("UP");
     

      $("#currentimg").addClass('rotate-up').delay(700).fadeOut(1);  
      $("#currentimg").attr("id","old-img");

       urlCheck();
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
  });

    $("#imgcontainer").on("swipedown",function(){
      console.log("DOWN");
     

      $("#currentimg").addClass('rotate-down').delay(700).fadeOut(1);  
      $("#currentimg").attr("id","old-img");

       urlCheck();
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
  });

};



// function preload(){

//   // jsondata = loadJSON("data.json", drawImage);
//   // urlArray = jsondata.data; 

//   // console.log("url array: "+urlArray);

//   console.log("PRELOAD COMPLETE");

// }

// function setup() {

//   createCanvas(2000, 2000);
//   imgX = 100;
//   imgY = 100; 
//   background(255);
//   console.log("SETUP COMPLETE");


// }

// function draw() {
// // }


// function keyPressed(){
//   console.log(keyCode);
//   if(keyCode ==32) { 
//   }

// }




// function drawImage(){
//   // if (imgLoaded == true) {
//   //   console.log("image is loaded");
//   //   // img.mask(imageMask);
//   //   image(img, 100, 100 , 200, 200);
//   //   imgLoaded = false; 
//   //     if (counter<arr.length && imgLoaded ==false){ //load a new image if there is still one in the array
//   //       img = loadImage(arr[counter]);
//   //       console.log("new url:"+arr[counter]);
//   //       console.log("counter:"+counter);
//   //       imgLoaded = true; 
//   //       counter++;
//   //     } 
//   //     else{ //ask bing for a new query 
//   //       counter = 0;
//   //       rCounter++;
//   //       imgLoaded = false; 
//   //       if (rCounter%2 ==0){
//   //         sendmouse(queries[queryCounter], false);
//   //         queryChecker();
//   //       } else sendmouse(queries[queryCounter], false);
//   //     }  
//   // }

// }


function sendmouse(keyword, newSearch) {
  
  var data = {
    // keyword: keyword,
    // newSearch: newSearch,
  };

  socket.emit('mouse',data);
}