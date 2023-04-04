let express = require('express');
let app = express();
let path = require("path");

console.log(directory);

app.set('views',path.join(directory ,'views'));
app.set('view engine', 'ejs');


let ejs = require("ejs");
const {title} =require('process');
const {writer} =require('repl');
app.use(express.urlencoded({extended:false}));

let guestbookList=[
  {"id":"1", "title":"제목1", "writer":"작성자1","contents":"내용1","wdate":"2011-11-30"},
  {"id":"2", "title":"제목1", "writer":"작성자1","contents":"내용1","wdate":"2011-11-30"},
  {"id":"3", "title":"제목1", "writer":"작성자1","contents":"내용1","wdate":"2011-11-30"},
  {"id":"4", "title":"제목1", "writer":"작성자1","contents":"내용1","wdate":"2011-11-30"},
  {"id":"5", "title":"제목1", "writer":"작성자1","contents":"내용1","wdate":"2011-11-30"}
];

app.get("/list" , function(request, response){
    var id = parseInt(request.params.id)-1;
    response.render('guestbook/list', {"title":"게시판목록","guestbookList":guestbookList});



    app.get("/view/:id", function(request, response){
      let id= parseInt(request.params.id)-1;
      response.render('guestbook/view', {"title":"게시판 상세화면", "guestbook":guestbookList[id]});


    });

    app.get("/write",(req,res)=>{
   res.render('guestbook/write');
    });

    app.post("/write",(req,res)=> {
      console.log(req.body);
      let title = req.body.title;
      let writer = req.body.writer;
      let contents = req.body.contents;
      let wdate = req.body.wdate;
      let id = guestbookList.length+1;

      guestbookList.push({ title:title, contents:contents,
        writer:writer, wdate:wdate, id:id});
               res.redirect("/list");
      });
      
      app.listen(4000, function (){
        console.log('Example app listening on port 4000!')
      }
)


    })