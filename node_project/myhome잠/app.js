let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const session = require("express-session");
const MYSQLSTORE = require("express-mysql-session")(session);
const DBInfo = require("./routes/commonDB"); //세션이 저장될 DB 정보를 넘겨야한다
const cors = require("cors");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let boardRouter = require("./routes/board");
let memberRouter = require("./routes/member");
let heroRouter = require("./routes/hero");
let RestBoardRouter = require("./routes/rest_board");
let scoreRouter = require("./routes/score");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 미들웨어 - 모든 웹 상의 요청이 거쳐간다
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
console.log(DBInfo.DBInfo);
let sessionStore = new MYSQLSTORE(DBInfo.DBInfo);
app.use(
  session({
    key: "session_key",
    secret:
      "rmsiddkanrjeuwiqorthfaesldkjfbdskjafbeskdljfbgheskjdlfbgwg32iosaikwaesk",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors()); // 보다 정밀하게 받는 방법을 찾아서 작성해야 한다
// 위 방식은 아무데서나 요청오면 다 받음

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/board", boardRouter);
app.use("/member", memberRouter);
// app.use("/hero", heroRouter);
app.use("/score", scoreRouter);
app.use("/rest_board", RestBoardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// let createError = require("http-errors");
// let express = require("express");
// let path = require("path");
// let cookieParser = require("cookie-parser");
// let logger = require("morgan");
// let cors = require("cors");

// const session = require("express-session");
// const MYSQLSTORE = require("express-mysql-session")(session);

// const DBInfo = require("./routes/commonDB");
// // ㄴ>session이 저장 될 db의 정보를 줘야한다.
// let indexRouter = require("./routes/index");
// let usersRouter = require("./routes/users");
// let scoreRouter = require("./routes/score");
// let memberRouter = require("./routes/member");
// let RestBoardRouter = require("./routes/rest_board");
// // let heroRouter = require("./routes/hero");
// let app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// //미들웨어- 모든 웹상의 요청이 거쳐간다.
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// // console.log(DBInfo.DBInfo)
// let sessionStore = new MYSQLSTORE(DBInfo.DBInfo);
// app.use(
//   session({
//     key: "session_key",
//     secret: "rmsiddkanrjsk",
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(cors());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/score", scoreRouter);
// app.use("/member", memberRouter);
// app.use("/rest_board", RestBoardRouter);
// // app.use("/score", heroRouter);
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;

// // let createError = require("http-errors");
// // let express = require("express");
// // let path = require("path");
// // let cookieParser = require("cookie-parser");
// // let logger = require("morgan");

// // // let createError = require('http-errors');
// // // let express = require('express');
// // // let path = require('path');
// // // let cookieParser = require('cookie-parser');
// // // let logger = require('morgan');
// // const session = require("express-session");
// // const MYSQLSTORE = require("express-mysql-session")(session);
// // const DBInfo = require("./routes/commonDB"); //세션이 저장될 디비정보를 줘야한다.

// // let indexRouter = require("./routes/index");
// // let usersRouter = require("./routes/users");
// // let boardRouter = require("./routes/board");
// // let memberRouter = require("./routes/member");

// // let app = express();

// // // view engine setup
// // app.set("views", path.join(__dirname, "views"));
// // app.set("view engine", "ejs");

// // app.use(logger("dev"));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, "public")));

// // //미들웨어 - 모든 웹상의 요청이 거쳐간다.

// // app.use(logger("dev"));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, "public")));
// // console.log();
// // let sessionStore = new MYSQLSTORE(DBInfo.DBInfo);
// // app.use(
// //   session({
// //     key: "session_key",
// //     secret: "rsdgasdg",
// //     store: sessionStore,
// //     resave: false,
// //     saveUninitialized: false,
// //   })
// // );

// // app.use("/", indexRouter);
// // app.use("/users", usersRouter);
// // app.use("/board", boardRouter);

// // // catch 404 and forward to error handler
// // app.use(function (req, res, next) {
// //   next(createError(404));
// // });

// // // error handler
// // app.use(function (err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get("env") === "development" ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render("error");
// // });

// // module.exports = app;
