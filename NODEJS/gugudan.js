// // http://127.0.0.1:4000/gugu?dan=4

// app.get("/mul/:x/:y", (req, res) => {

//     for(let i =1 ; x<= 9; i++){

//     let x = parseInt(req.params.x);

//     let mul = { mul: x * y };
//     }
//     res.send(mul); //send함수를 이용해서 json데이터 송신
//   });

let express = require("express");
let app = express();

//더하기 연산자는 parseint 써야함.

app.get("/gugu", (request, response) => {
  let dan = request.query.dan;
  let result = "";
  for (i = 1; i <= 9; i++) {
    result += `${dan} * ${i}= ${dan * i}<br/>`;
  }
  console.log(result);
  response.writeHead(200, { "Content-type": "text/html" });
  response.end(result);
  //response.end("hello");//이미 데이터 보내기를 완료했기 때문에 오류 발생...
});





app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<H1>Express</H1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
