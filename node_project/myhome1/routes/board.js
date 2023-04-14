let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* GET home page. */

router.get("/list/:pg", async function (req, res, next) {
  let pg = parseInt(req.params.pg);
  //pg=1 0
  //pg=2 
  //pg=3

  let sql = `     
  SELECT count(*) cnt
  FROM tb_board A
  LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
  LEFT OUTER JOIN tb_member C ON A.writer=C.userid
   `;

  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql = `    
  SELECT A.id, A.title, A.writer, A.num, A.username
  ,date_format(A.wdate, '%Y-%m-%d') wdate
  FROM(
   
   SELECT A.id, A.title, A.writer, A.wdate,C.username,  
  @rownum:=@rownum+1 num
   FROM tb_board A
   LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
   LEFT OUTER JOIN tb_member C ON A.writer=C.userid
   ORDER BY id DESC)A

   LIMIT ${(pg-1)*10}, 10

  `;

  results = await commonDB.mysqlRead(sql, []);
  console.log(results);
  res.render("board/board_list", {
    session: req.session,
    boardList: results,
    totalCnt: totalCnt,
    pg:pg,
    paging:commonUtil.getPaging(pg,totalCnt) });

});

module.exports = router;

router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `select * from tb_board where id=${id}`;
  let results = await commonDB.mysqlRead(sql, []);
  let boardItem = results[0];
  res.render("board/board_view", { board: boardItem });
});

// router.get("/board/view/", async function (req, res, next) {
//   let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate
//              from tb_board
//              where id = ?`;

//   let result = await commonDB.mysqlRead(sql, [id]);

//   res.render("board/board_detail", { boardItem: result[0] });

// });
