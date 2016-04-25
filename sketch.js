var socket;
var img;

var data;
var urlArray1 = []; 
var urlArray2 = []; //left
var urlArray3 = []; //if you swipe right, get another 

var counter1 = 0;
var counter2= 0;
var counter3 = 0;

var setCounter = 0;
var idLength = 0; 

function urlCheck(array, counter){
 if(counter+1<array.length){
  console.log("counter up");
  counter++;
 } else{ counter = 0;
    // setCheck(array, counter);
 }
 console.log("updating img: "+counter);
  img = array[counter].img;
}


function setCheck(array, counter){


 // if(setCounter<idLength){
 //  setCounter++;
 // } else setCounter = 0;
 //  data = $.getJSON( "data.json", function(data) {
 //      console.log( "success" );
 //      console.log("data: "+data);
 //      urlArray = data[setCounter].urls;
 //      console.log("urlarray: "+urlArray);
 //      img = urlArray[counter].img;
 //      $("#currentimg").attr("src", img);
 //    })
 //    .done(function() {
 //      console.log( "second success" );
 //    })
 //    .fail(function() {
 //      console.log( "error" );
 //    })
 //    .always(function() {
 //      console.log( "complete" );
 //  });
}

window.onload = function() {

  data = $.getJSON( "data.json", function(data) {
    console.log( "success" );
    console.log("data: "+data);
    idLength = data.length;
    // setCounter();

    for(var i = 0; i<data.length; i++){
      if (i ==0) urlArray1 = data[i].urls;
      else if (i ==1) urlArray2 = data[i].urls;
      else urlArray3 = data[i].urls;
    }
      // urlArray = data[0].urls;
      // console.log("urlarray: "+urlArray);
      img = urlArray2[counter2].img;
      counter2++;
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

      if(counter3+1<urlArray3.length){
        console.log("counter up");
        counter3++;
       } else counter3 = 0; 
       img = urlArray3[counter3].img;
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
  });

  $("#imgcontainer").on("swipeleft",function(){
      console.log("LEFT");
     

      $("#currentimg").addClass('rotate-right').delay(700).fadeOut(1);  
      $("#currentimg").attr("id","old-img");

      if(counter2+1<urlArray2.length){
        console.log("counter up");
        counter2++;
       } else counter2 = 0; 
       img = urlArray2[counter2].img;      
       $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
  });

 
  // $("#imgcontainer").on("swipeup",function(){
  //     console.log("UP");
     

  //     $("#currentimg").addClass('rotate-up').delay(700).fadeOut(1);  
  //     $("#currentimg").attr("id","old-img");

  //      urlCheck();
  //     $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
  // });

  //   $("#imgcontainer").on("swipedown",function(){
  //     console.log("DOWN");
     

  //     $("#currentimg").addClass('rotate-down').delay(700).fadeOut(1);  
  //     $("#currentimg").attr("id","old-img");

  //      urlCheck();
  //     $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
  // });

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