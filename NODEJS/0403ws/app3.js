var express = require("express");
var app = express(); // 서버 만들었음
//bodyParser 모듈이 있는데 모듈을 설치하고 express 자체적으로 body에 데이터 가져온다.



//request는 읽어오는것
app.use(express.urlencoded({ extended: false }));
//미들웨어 ,app 객체 만들고, 다른 url처리전에만 호출되면 된다.

app.post("/add", (request, response) => {
  let x = request.body.x;
  let y = request.body.y;
  let z = parseInt(x) + parseInt(y);

  response.send({ x: x, y: y, z: z });
});

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
//get방식의 경우, ?x=4&y=5 request.query.x
 //get방식의 경우, /4/5 request.params.x

 //post의 경우 app.use(express.urlencoded({ extended: false }));
 //가 선행되어야 한다. request.body.x로 처리한다.


