// npm install cors

// http://localhost:9090/hero/list

var express = require("express");
var router = express.Router();
let commonDB = require("./commonDB");
//const { mysqlRead } = require('./commonDB');

/* GET home page. */
router.get("/list", async function (req, res, next) {
  let sql = `
        SELECT A.student,  A.kor, A.math, A.eng
        FROM score A
    
    `;
  let results = await commonDB.mysqlRead(sql, []);
  res.json(results);

  // res.json(
  //     [
  //         {id:1, name:"이순신", desc:"임진왜란으로부터 나라를 구함"},
  //         {id:2, name:"세종대왕", desc:"한글 창제"},
  //         {id:3, name:"을지문덕", desc:"살수대첩"},
  //         {id:4, name:"강감찬", desc:"귀주대첩"},
  //         {id:5, name:"문종", desc:"자격루"}
  //     ]
  // )
});

router.post("/write", async function (req, res, next) {
  try {
    let score_name = req.body.hero_name;
    let score_kor = req.body.kor_desc;
    let score_math = req.body.math_desc;
    let score_eng = req.body.eng_desc;
    let sql = `
            INSERT INTO tb_score(score_name, score_kor, score_math, score_eng,
              wdate) 
            VALUES(?, ?, ?, ?, NOW());
        `;

    await commonDB.mysqlRead(sql, [
      score_name,
      score_kor,
      score_math,
      score_eng,
    ]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

router.post("/update", async function (req, res, next) {
  try {
    let id = req.body.id;
    let score_name = req.body.score_name;
    let hero_kor = req.body.score_desc;
    let hero_math = req.body.score_desc;
    let hero_eng = req.body.score_desc;
    let sql = `
            UPDATE tb_score SET score_name=?
            , score_kor=? , score_math=? , score_eng=?
            WHERE id=?
        `;

    await commonDB.mysqlRead(sql, [student, kor, math, eng]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

// 접속 확인 링크
// http://localhost:9090/hero/view/1
router.get("/view/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let sql = `select * from tb_score where id=${id}`;
    let results = await commonDB.mysqlRead(sql, []);
    res.json({ result: "success", score: results[0] });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

module.exports = router;
