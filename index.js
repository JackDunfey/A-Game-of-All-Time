const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/static", express.static(`${__dirname}/public`));
app.set("view engine","pug")
app.get("/", (req,res)=>{
    res.redirect("/game");
});
app.get("/game", (req,res)=>{
    res.render("game");
});
app.get("/login", (req,res)=>{
    res.render("login");
});
app.listen(80);