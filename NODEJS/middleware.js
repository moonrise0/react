let express = require("express");
let app = express();

//첫번째
app.use((request, response, next) => {
  request.name = "홍길동";
  response.name = "John";
  console.log("a");
  next();
});
//request 브라우저 -> 서버 보낼 떄 모두 갖고 있는 것.
//response  서버 -> 브라우저
//next -다음함수를 호출한다.

//두번쨰
app.use((request, response, next) => {
  console.log("bbbbb");
  request.phone = "010-5555--5252";
  response.address = "서울시n";
  next();
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html"  });
  console.log(request.name);
  console.log(response.name);
  console.log(request.phone);
  console.log(response.address);

  response.end(`<H1>${request.name}</H1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
