let http = require("http");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text / html" });
    response.end("<h1>Hello my first webserever</h1>");
  })
  .listen(4000, () => {
    console.log("server. start http://127.0.0.1:4000");
  });

//npm install nodemon
