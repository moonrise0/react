var express = require("express");
var app = express();
var ejs = require("ejs"); // 서버 만들었음
var fs = require("fs");
//bodyParser 모듈이 있는데 모듈을 설치하고 express 자체적으로 body에 데이터 가져온다.

app.set("view engin", ejs); //내부변수에 값을 설정한다.
app.use(express.urlencoded({ extended: false }));
//미들웨어 ,app 객체 만들고, 다른 url처리전에만 호출되면 된다.

app.get("/", (request, response) => {
  fs.readFile("html/index.html", "utf-8", (error, data) => {
    response.send(data.toString());
  });
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
