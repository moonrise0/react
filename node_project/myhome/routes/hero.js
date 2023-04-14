// npm install cors

// http://localhost:9090/hero/list

var express = require("express");
var router = express.Router();
let commonDB = require("./commonDB");
//const { mysqlRead } = require('./commonDB');

/* GET home page. */
router.get("/list", async function (req, res, next) {
  let sql = `
        SELECT A.id, A.hero_name, A.hero_desc, date_format(A.wdate, '%Y-%m-%d') wdate
        FROM tb_hero A
    
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
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `
            INSERT INTO tb_hero(hero_name, hero_desc, wdate) 
            VALUES(?, ?, NOW());
        `;

    await commonDB.mysqlRead(sql, [hero_name, hero_desc]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

router.post("/update", async function (req, res, next) {
  try {
    let id = req.body.id;
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `
            UPDATE tb_hero SET hero_name=?
            , hero_desc=? WHERE id=?
        `;

    await commonDB.mysqlRead(sql, [hero_name, hero_desc, id]);
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
    let sql = `select * from tb_hero where id=${id}`;
    let results = await commonDB.mysqlRead(sql, []);
    res.json({ result: "success", hero: results[0] });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

module.exports = router;
