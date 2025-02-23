//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var comments = [];
var server = http.createServer(function(req, res){
  //parse url
  var parseUrl = url.parse(req.url);
  var pathName = parseUrl.pathname;
  if(pathName === '/'){
    fs.readFile('./index.html', function(err, data){
      if(err){
        console.log(err);
        res.end('404 Not Found');
      }else{
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(data);
      }
    });
  }else if(pathName === '/comment'){
    if(req.method === 'POST'){
      var postData = '';
      req.on('data', function(chunk){
        postData += chunk;
      });
      req.on('end', function(){
        var comment = qs.parse(postData);
        comments.push(comment.comment);
        res.end('success');
      });
    }else{
      res.end(JSON.stringify(comments));
    }
  }else{
    fs.readFile(path.join(__dirname, pathName), function(err, data){
      if(err){
        console.log(err);
        res.end('404 Not Found');
      }else{
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(data);
      }
    });
  }
});
server.listen(3000, function(){
  console.log('server is listening on port 3000');
});