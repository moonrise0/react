let express = require("express");
let app = express();
let ejs = require("ejs");
var fs = require("fs");

app.use(express.urlencoded({ extended: false }));

app.get("/guguform", (request, response) => {
  fs.readFile("./html/guguform.html", "utf-8", (err, data) => {
    response.writeHead(200, { "Content-type": "text/html" });
    response.end(ejs.render(data));
  });
});

app.get("/gugu", (request, response) => {
  let dan = parseInt(request.query.dan);
  let result = "";
  for (i = 1; i <= 9; i++) {
    result += `${dan} * ${i}= ${dan * i}<br/>`;
  }
  response.send(result);
});
app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end(`<H1>${result}</H1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
