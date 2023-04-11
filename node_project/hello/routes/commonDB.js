var mysql = require("mysql");
const DBinfo={
       connectionLimit:10,
       host:"localhost",
       user:"user01",
       password:"1234",
       database:"mydb",
       port:3306

};

let readpool = mysql.createPool(DBinfo);//
async function mysqlRead(sql, params)
{
  let promise = new Promise((resolve, reject)=>{
     if(err)
     {
      console.log(err);
      reject(err);
     }

     connect.query(sql, params, (err,rows)=>{
           console.log(sql);
           console.log(rows);
           if(err)
                reject(err);
           else
              resolve(rows);
        conn.release();
 

    })

  });
  await promise;
  return promise;

}