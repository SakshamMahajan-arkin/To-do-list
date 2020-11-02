const express=require("express");
const bodyparser = require("body-parser");
const date = require(__dirname+"/date.js");
const app=express();
let items = ["Buy food","Cook food","Eat food"];
let w = [];
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){

  let day=date();
  res.render("list",{no:day,second:items});

});

app.post("/",function(req,res){
  let item=req.body.newitem;
  if (req.body.list=="work"){
    w.push(item);
    res.redirect("/work");
  }
  else{
  //let item=req.body.newitem;
  items.push(item);
}
  res.redirect("/");
})
app.get("/work",function(req,res){
  res.render("list",{no:"work",second:w});
});
app.post("/work",function(req,res){
  let item = req.body.newitem;
  w.push(item);
  res.redirect("/work");
});

app.listen(5003,function(){
  console.log("Server is running on port 5003");
})
