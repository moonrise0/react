//rest_board.js
let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* GET home page. */

/*http://localhost:9090/rest_board/list/1  마지막 1 페이지도 적어줘야한다.*/

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

   LIMIT ${(pg - 1) * 10}, 10

  `;

  results = await commonDB.mysqlRead(sql, []);
  console.log(results);
  res.json({
    boardList: results,
    totalCnt: totalCnt,
    pg: pg,
  }); //응답완료.
  //한 함수내에서 res.json 호출하고 또 다시 res.send나 render나 json 호출 못한다.
});

module.exports = router;

router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `select A.id, A.title, A.writer, 
             date_format(A.wdate, '%Y-%m-%d') wdate, 
            (select username from tb_member B where A.writer=B.userid) username
            from tb_board A
            where id=${id}`;

  /* 
            subquery : select(결과셋이 하나 또는 0일떄 가능 ) , 
            from:인라인 뷰 , 
            where: 드물다( 책은 여기만)
            조인 => 서브쿼리(캐쉬가 된다) => 함수 ( 속도는 조인이 빠르다)
            nested loop join  => for문 돌려서 조인을 한다. 10이전 버전 
            hash join =-> 양쪽 테이블  join 컬럼을 기준으로 해쉬테이블을 만들어 조인한다.
            (엄청빠름)

            선형비교(n번 비교), 이진검색(데이터가 순서대로 있을때), 해쉬 검색(젤빠름) 
            */

  let results = await commonDB.mysqlRead(sql, []);
  if (results.length == 0) {
    res.json({ result: "fail", msg: "해당데이터를 찾을 수 없습니다." });
    return;
  }

  res.json({ result: "success", msg: "", boardData: results[0] });

  let boardItem = results[0];
  res.render("rest_board/rest_board_view", { board: boardItem });
});

//http://127.0.0.1/9090/rest_board/save
// {title : "제목", writer:"test", contest:"내용"}
//응답 성공시 result:"success" msg:"등록성공"
//응답 실패시 result:"fail" msg:"등록실패"

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

  res.json({ result: "success" });
});

module.exports = router;

// router.get("/board/view/", async function (req, res, next) {
//   let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate
//              from tb_board
//              where id = ?`;

//   let result = await commonDB.mysqlRead(sql, [id]);

//   res.render("board/board_detail", { boardItem: result[0] });

// });
