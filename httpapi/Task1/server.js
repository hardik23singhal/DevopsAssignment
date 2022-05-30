var express = require('express');
var app = express();

var data= {
    "counter" : "123"
}

var info={"git":"githash", "branch":"development-branch", "env": "stg", "hostname": "hostname" }

var os = require("os");
var hostname = os.hostname();

app.get('/counter', function (req, res) {
    // First 
    
   var k= parseInt(data['counter']);
   k++;
   data['counter']=k.toString();
    res.send(data);
    
 });
 app.post('/counter', function (req, res) {
   
   var k= parseInt(data['counter']);
   k+=2;
   data['counter']=k.toString();
    res.send(data);
    
 });

 app.delete('/counter', function (req, res) {
   
    
   
   var k= parseInt(data['counter']);
   k-=1;
   data['counter']=k.toString();
     res.send(data);
     
  });

  app.get('/info', function (req, res) {
     info['hostname']= hostname;
     info['branch']= "master";
    
   
  
    res.send(info);
    
 });
var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port)
});