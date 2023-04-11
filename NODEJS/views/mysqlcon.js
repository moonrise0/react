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
  sql = `select id, title , writer , date_format(wdate, '%Y-%m-%d') wdate from tb_board`


  connection.query(sql, (err, rows) => {
    console.log(rows);
    connection.release(); //연결해제
  });
});
console.log("end");
