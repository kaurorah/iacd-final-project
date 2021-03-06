
(function() {
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


window.onload = function() {



  data = $.getJSON( "data.json", function(data) {
    console.log( "success" );
    console.log("data: "+data);
    idLength = data.length;
    // setCounter();

    // for(var i = 0; i<data.length; i++){
      var id = getRandomInt(0,1)
      urlArray1 = data[id].urls;
      // if (i ==0) urlArray1 = data[i].urls;
      // else if (i ==1) urlArray2 = data[i].urls;
      // else urlArray3 = data[i].urls;
    // }
      // urlArray = data[0].urls;
      // console.log("urlarray: "+urlArray);
      img = urlArray1[counter1].img;
      counter1++;
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

      if(counter1+1<urlArray1.length){
        console.log("counter up");
        counter1++;
       } else counter1 = 0; 
       img = urlArray1[counter1].img;
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
      if(window.orientation != 0){
        $("img").css({"width":"50%","height":"100%"});
      }
  });

  $("#imgcontainer").on("swipeleft",function(){
      console.log("LEFT");
     

      $("#currentimg").addClass('rotate-right').delay(700).fadeOut(1);  
      $("#currentimg").attr("id","old-img");

     if(counter1+1<urlArray1.length){
        console.log("counter up");
        counter1++;
       } else counter1 = 0; 
       img = urlArray1[counter1].img;
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
      if(window.orientation != 0){
        $("img").css({"width":"50%","height":"100%"});
      }
  });

 
 
  $("#imgcontainer").on("swipeup",function(){
      console.log("UP");
     

      $("#currentimg").addClass('rotate-up').delay(500).fadeOut(1);  
      $("#currentimg").attr("id","old-img");

     if(counter1+1<urlArray1.length){
        console.log("counter up");
        counter1++;
       } else counter1 = 0; 
       img = urlArray1[counter1].img;
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
      if(window.orientation != 0){
        $("img").css({"width":"50%","height":"100%"});
      }
  });

    $("#imgcontainer").on("swipedown",function(){
      console.log("DOWN");
     

      $("#currentimg").addClass('rotate-down').delay(500);  
      $("#currentimg").attr("id","old-img");

     if(counter1+1<urlArray1.length){
        console.log("counter up");
        counter1++;
       } else counter1 = 0; 
       img = urlArray1[counter1].img;
      $("#imgcontainer").prepend("<img src="+img+" id ='currentimg'>");
      if(window.orientation != 0){
        $("img").css({"width":"50%","height":"100%"});
      }
  });

    $(window).on("orientationchange",function(){
      if(window.orientation == 0) // Portrait
      {
        $("img").css({"width":"100%","height":"50%"});
      }
      else // Landscape
      {
        console.log("LANDSCAPE");
        $("img").css({"width":"50%","height":"100%"});
      }
    });



};




function sendmouse(keyword, newSearch) {
  
  var data = {
    // keyword: keyword,
    // newSearch: newSearch,
  };

  socket.emit('mouse',data);
}