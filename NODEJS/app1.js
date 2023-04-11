var express = require("express");
var app = express(); // 서버 만들었음

//express 모듈자체가 use,get,posT 함수3개가있음.
//use - get, post가 오던
//get -get방식으로 온것만
//post - post방식으로 온것만
app.use("/test", (request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<H1>Test</H1>");
});

app.get("/get", (request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<H1>GET</H1>");
});

app.get("/userinfo", (req, res) => {
  let userinfo = { name: "Tom", phone: "000-0000-0000" };
  res.send(userinfo); //send함수를 이용해서 json데이터 송신
});

//userinfo2?name=Jane&phone=010000000000
app.get("/userinfo2", (req, res) => {
  console.log(req.query);
  let userinfo = { name: req.query.name, phone: req.query.phone };
  res.send(userinfo); //send함수를 이용해서 json데이터 송신
});

//get방식 새롭게 추가된 url방식
// http://127.0.0.1:4000/userinfo3/Brown/user01
app.get("/userinfo3/:username/:userid", (req, res) => {
  console.log(req.params);
  let userinfo = { name: req.params.username, id: req.params.userid };
  res.send(userinfo); //send함수를 이용해서 json데이터 송신
});

app.post("/post", (request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<H1>POST</H1>");
});
//다른 URL 처리 없을떄 처리한다.
app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<H1>Express</H1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
