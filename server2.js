
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var storageArr = [];

var server = http.createServer(handleRequest);
server.listen(process.env.PORT || 5000);

console.log('Server started on port 5000');
var urlArray;



function handleRequest(req, res) {
  var pathname = req.url;
    if (pathname == '/') {
    pathname = '/index.html';
  }
    var ext = path.extname(pathname);

  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  var contentType = typeExt[ext] || 'text/plain';

  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}


var io = require('socket.io').listen(server);

io.sockets.on('connection',
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
      socket.on('mouse',
      function(data) {
       

        io.sockets.emit('mouse', newImage);
      }
    );
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);