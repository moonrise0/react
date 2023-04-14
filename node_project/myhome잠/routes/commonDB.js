var mysql = require("mysql");

const DBInfo = {
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "user01",
  password: "1234",
  database: "mydb",
  port: 3306,
};

let readpool = mysql.createPool(DBInfo); //
async function mysqlRead(sql, params) {
  let promise = new Promise((resolve, reject) => {
    readpool.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      conn.query(sql, params, (err, rows) => {
        console.log(sql);
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
        conn.release();
      });
    });
  });
  await promise;
  return promise;
}
exports.DBInfo = DBInfo;
exports.mysqlRead = mysqlRead;

// `select* from tb_board where id=${id}`
// `select * from tb_board where id=?`,[id]
