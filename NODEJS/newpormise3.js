let mysql = require("mysql");
let pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "user01",
  password: "1234",
  database: "mydb",
  port: 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connection success");

  new Promise((resolve, reject) => {
    sql = ` insert into tb_board(title, writer, contents, wdate) 
          values(?,?,?,now())
  `;
  });
  let params = ["제목2", "임꺽정", "내용2"];

  connection
    .query(sql, params, (err, rows) => {
      if (err) reject("db오류");
      else console.log("success");
    })

    .then((result) => {
      sql = "select * from tb_board";
      connection.query(sql, (err, rows) => {
        if (err) console.log("err");
        console.log("rows");
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

console.log("end");
