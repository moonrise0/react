let http = require("http");

let server = http.createServer((request, response) => {


  // 브라우저 http 서버 로 액세스 요청이 들어오면 request객체 - 브라우저에서 요청한 정보를 담아오는 객체,
  // response 객체 - 서버에서 클라이언트로 정보를 보낼때 여기에 담아 보낸다.

  
  response.writeHead(200, { "Content-Type": "text / html; charset= utf-8" });
  response.end("<h1>두번째 서버입니다</h1>");
});

server.listen(4000, () => {
  console.log("server. start http://127.0.0.1:4000");
});

//npm install nodemon
