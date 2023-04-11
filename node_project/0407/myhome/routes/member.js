var express = require("express"); // node_modules폴더에 있으면
var router = express.Router();
let commonDB = require("./commonDB");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("member/member_register", { title: "Express" });
});

//아이디 중복체크 -- 클라이언트로부터 아이디를 받는다
//                  받아온 아이디를 디비에 가서 존재하는지 유무확인
//                 존재하면 fail 사용자에게 보내주고, 존재하지 않아서 사용가능하면 success
//                 반환하게
router.use("/idcheck", async function (req, res, next) {
  let userid = req.body.userid; //사용자단에서 userid
  let sql = `select count(*) cnt from tb_member where userid='${userid}' `;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  if (cnt == 0) res.json({ result: "success" });
  else res.json({ result: "fail" });
});

router.post("/save", async function (req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  let nickname = req.body.nickname;

  console.log("userid : " + req.body.userid);
  let sql = `insert into tb_member(userid,password,username, 
    email,phone,nickname, zipcode,address1,address2,wdate) 
    values(?,?,?,?,?,?,?,?,?,now())`;

  try {
    await commonDB.mysqlRead(sql, [
      userid,
      password,
      username,
      email,
      phone,
      nickname,
      zipcode,
      address1,
      address2,
    ]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

router.get("/login", async function (req, res, next) {
  res.render("member/member_login");
});

router.get("/put", async function (req, res, next) {
  let userid = req.query.userid;
  req.session["userid"] = userid;
  console.log(req.session["userid"]);
});

module.exports = router;
