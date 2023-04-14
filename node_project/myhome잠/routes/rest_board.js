// rest_board.js

let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

// http://localhost:9090/rest_board/list --> 이렇게 하면 안됨
// http://localhost:9090/rest_board/list/1 --> 이렇게 해야함

/* GET home page. */
router.get("/list/:pg", async function (req, res, next) {
  let pg = parseInt(req.params.pg);
  // pg=1 0  (pg-1)*10
  // pg=2 10 (2-1)*10
  // pg=3 20 (3-1)*10

  let sql = `
      SELECT COUNT(*) cnt
      FROM tb_board A
      LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
      LEFT OUTER JOIN tb_member C ON A.writer=C.userid
    `;

  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql = `
      SELECT A.id, A.title, A.writer, A.num, A.username
        ,date_format(A.wdate, '%Y-%m-%d') wdate
      FROM
      (
        SELECT A.id, A.title, A.writer, A.wdate, C.username
        ,@rownum:=@rownum+1 num
        FROM tb_board A 
        LEFT OUTER JOIN (SELECT @rownum:=0) B ON 1=1
        LEFT OUTER JOIN tb_member C ON A.writer=C.userid
        ORDER BY id DESC
      )A
      LIMIT ${(pg - 1) * 10}, 10
  `;

  results = await commonDB.mysqlRead(sql, []);
  console.log(results);
  res.json({ boardList: results, totalCnt: totalCnt, pg: pg });
  // 한 함수 내에서 res.json 호출하고 또 다시 res.send 나 render나 json 호출 못한다
});

router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `
      SELECT A.id, A.title, A.writer, date_format(wdate, '%Y-%m-%d') wdate,
      (SELECT username FROM tb_member B where A.writer=B.userid) username
      FROM tb_board A
      WHERE id=${id}
  `;

  let results = await commonDB.mysqlRead(sql, []);
  if (results.length === 0) {
    res.json({ results: "fail", msg: "해당하는 데이터를 찾을 수 없습니다." });
    return;
  }
  res.json({ results: "success", msg: "", boardData: results[0] });
  /*
subquery : select (결과셋이 하나 또는 0일때 가능),
          from: 인라인뷰,
          where 절에서는 드물다
  조인 -> 서브쿼리(캐쉬가 된다) -> 함수
  nested loop join => for문 돌려서 조인을 한다. 10 이전 버전
  hash join => 양쪽 테이블의 join 컬럼을 기준으로 해쉬테이블을 만들어 조인한다 (엄청 빠름)

  선형검색(n번 비교), 이진검색(데이터가 순서대로 있을 때 중간값을 찾아 앞뒤로 비교), 해쉬검색(제일 빠름)
*/
});

// http://localhost:9090/rest_board/save
// {title:"제목", writer:"test", contents:"내용"}
// 응답 성공 시 result:"success", mgs:"등록 성공"
// 응답 실패 시 result:"fail", msg:"등록 실패"

router.post("/write", async function (req, res, next) {
  checkInfos = [
    { key: "title", type: "str", range: 200 },
    { key: "writer", type: "str", range: 40 },
    { key: "contents", type: "str", range: -1 },
  ];

  // 수행결과값이 0이면 문제 없는거고 다른 숫자가 온다 오류임..
  insertInfo = userinfo = commonUtil.checkInfo(req, checkInfos);
  if (insertInfo["result"] != 0) {
    res.json({ insertInfo });
    return;
  }

  let title = req.body.title;
  let writer =req.body.writer;
  let contents=req.body.contents;
  let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
  results = await commonDB .mysqlRead(sql, )
  if (results[0]["cnt"==0])
  {
    res.json({result:"fail", msg:"해당하는 이미지가 없다"});
    return;
  }

  sql= `insert into tb_board(title, writer, contents, wdate)
  values('${title}',  '${writer}', '${contents}' ,'${contents}' , now() )`;
  await commonDB.mysqlRead(sql, []);
  
  res.json({ "result": "success", msg:"등록성공" });

});

module.exports = router;
