const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
  const coin = req.body.currency;
  const url="http://api.nomics.com/v1/currencies/ticker?key=5c1682501c4de9a46310bc58913097585b111406&ids="+coin+"&interval=1d,30d&convert=INR&per-page=100&page=1";
  http.get(url,function(response){
    response.on("data",function(data){
      const coin_data=JSON.parse(data);
      console.log(coin_data[0].price);
      res.write("<h1>Price of "+coin+" is "+coin_data[0].price+"</h1>");
      res.send();
    })
  })

})

app.listen(3000,function(){
  console.log("server is running");
})




















// API key: 5c1682501c4de9a46310bc58913097585b111406
