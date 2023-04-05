var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('guestbook/list' );
  res.send("ajaxtest");
});

router.get("/ajaxtest1", function (req, res, next) {
  // res.render('guestbook/list' );
  res.render("ajax/ajaxtest1");
});

//send함수가 적당히 알아서 데이터 보낸다.
router.use("/result1", function (req, res, next) {
  res.send("data만 보낸다");
});

router.get("/ajaxtest2", function (req, res, next) {
  res.render("ajax/ajaxtest2");
});

router.get("/ajaxtest3", function (req, res, next) {
  res.render("ajax/ajaxtest3");
});

//http://127.0.0.1:3000/ajax/add?x=5&y=8;
//send함수가 적당히 알아서 데이터 보낸다.

// router.use("/add", function (req, res, next) {
//   x = parseInt(req.query.x);
//   y = parseInt(req.query.y);
//   z = x + y;
//   res.json({ result: z });
// });

router.use("/add", function (req, res, next) {
  kor = parseInt(req.query.kor);
  eng = parseInt(req.query.eng);
  mat = parseInt(req.query.mat);
  sum = kor + eng + mat;
  avg = (kor + eng + mat) / 3;
  // res.json( {result:sum} );
  res.json({ result: `총점은 ${sum}점 평균 ${avg}점` });
});

module.exports = router;
