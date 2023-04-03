var express = require("express");
var app = express(); // 서버 만들었음

//http://127.0.0.1:4000/add?x=45&y=7

//http://127.0.0.1:4000/add/45/7
app.get("/get", (request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<H1>GET</H1>");
});

app.get("/add", (req, res) => {
  let x = parseInt(req.query.x);
  let y = parseInt(req.query.y);

  let add = { add: x + y };
  res.send(add); //send함수를 이용해서 json데이터 송신
});

app.get("/add/:x/:y", (req, res) => {
  let x = parseInt(req.params.x);
  let y = parseInt(req.params.y);

  let add = { add: x + y };
  res.send(add); //send함수를 이용해서 json데이터 송신
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<H1>Express</H1>");
});


app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});


