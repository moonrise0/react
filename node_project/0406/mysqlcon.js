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
});
console.log("end");
