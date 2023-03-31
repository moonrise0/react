let http = require("http");
let fs = require("fs"); //파일을 읽기 위함
let url = require("url"); // url분석을 위한 라이브러리
//http://127.0.0.1:2010/add?x=4&y=5
//http://127.0.0.1:2010/sub?x=4&y=5
//http://127.0.0.1:2010/userinfo?userid=test&username=Tom

let server = http.createServer((request, response) => {
  // console.log(request.url); //전송 url
  console.log(request.mothod); //전송방식
  let rurl = request.url;
  let pathname = url.parse(rurl, true).pathname; //add
  let pathname1 = url.parse(rurl, true).pathname1; //sub
  let query = url.parse(rurl, true).query;
  //string 분석 -> json객체로 전환
  // 파싱한다라고 표현
  console.log(query);
  console.log(pathname);
  console.log(pathname1);

  if (pathname == "/add") {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(`${query.x} + ${query.y} = ${query.x + query.y}`);
  } else {
    response.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
    response.end(`<h1>존재하지 않는 url입니다.</h1>`);
  }

  if (pathname1 == "/sub") {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(`${query.x} - ${query.y} = ${query.x - query.y}`);
  } else {
    response.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
    response.end(`<h1>존재하지 않는 url입니다.</h1>`);
  }
});
server.listen(2010, () => {
  console.log("server start http://127.0.0.1:2010");
});

// let http = require("http");
// let fs = require("fs"); //파일을 읽기 위함
// let url = require("url"); // url분석을 위한 라이브러리

// //http://127.0.0.1:6010/add?x=4&y=5
// //http://127.0.0.1:6010/sub?x=4&y=5
// //http://127.0.0.1:6010/userinfo?userid=test&username=Tom

// let server = http.createServer((request, response) => {
//   // console.log(request.url); //전송 url
//   console.log(request.method); //전송방식 get
//   let rurl = request.url;
//   let pathname = url.parse(rurl, true).pathname; //add
//   let query = url.parse(rurl, true).query;
//   //string 분석 -> json객체로 전환

//   // 파싱한다라고 표현
//   console.log(query);
//   console.log(pathname);
//   console.log(typeof query);
//   if (pathname == "/add") {
//     response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//     let x = parseInt(query.x);
//     let y = parseInt(query.y);
//     let z = x + y;

//     response.end(`${x} + ${y} = ${z}`);
//   } else {
//     response.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
//     response.end(`<h1>존재하지 않는 url입니다.</h1>`);
//   }
// });
// server.listen(6010, () => {
//   console.log("server start http://127.0.0.1:6010");
// });
