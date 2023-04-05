let http = require("http");

let server = http.createServer((request, response) => {
  if (request.method == "POST") {
    response.writeHead(200, { "Content-Type": "text / html; charset= utf-8" });
    response.end("<h1>POST</h1>");
  } else {
    response.writeHead(200, { "Content-Type": "text / html; charset= utf-8" });
    response.end("<h1>GET</h1>");
  }
});

server.listen(4000, () => {
  console.log("server. start http://127.0.0.1:4000");
});

//npm install nodemon
