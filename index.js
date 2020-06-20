const express = require('express');
const request = require('request');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
  const data={
    members:[
      {
    email_address: req.body.em,
    status: "subscribed",
    merge_fields: {
      FNAME:req.body.fn,
      LNAME:req.body.ln
    }
  }
  ]
  }
  const jsondata = JSON.stringify(data);
  const url= 'https://us10.api.mailchimp.com/3.0/lists/4ae205e440'
  const option ={
    method:"post",
    auth:"rathore1:69fdafc70918f1623e164d83c6cfddba-us10",
  } ;

  const request = https.request(url,option,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on('data',function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(3400, function() {
  console.log('Server is running at 3400 port');
});


//API key 69fdafc70918f1623e164d83c6cfddba-us10

//unique id 4ae205e440
