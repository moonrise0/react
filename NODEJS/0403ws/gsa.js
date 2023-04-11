// http://127.0.0.1:4000/gugu?dan=4

app.get("/mul/:x/:y", (req, res) => {
    

    for(let i =1 ; x<= 9; i++){
  
    let x = parseInt(req.params.x);
   
    let mul = { mul: x * y };
    }
    res.send(mul); //send함수를 이용해서 json데이터 송신
  });
  