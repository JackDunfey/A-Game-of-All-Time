const express = require("express");
const app = express();
const Datastore = require("./Datastore.js");
const users = new Datastore("./users.db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken.js");
require("dotenv/config");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(require("cookie-parser")());
app.use("/static", express.static(`${__dirname}/public`));
app.set("view engine","pug")
app.get("/", (req,res)=>{
    res.redirect("/game");
});
app.get("/game", verifyToken, (req,res)=>{
    res.render("game", {
        user: {
            isAnonymous: req.anonymous,
            username: req.anonymous ? null : req.JWTBody.username,
        }
    });
});
app.get("/login", verifyToken, (req,res)=>{
    res.render("login");
});
app.post("/login", verifyToken, (req,res)=>{
    users.find({"username": req.body.username}, (err, [user]) => {
        if(err)
            return res.status(500).send(err);
        else if(!user)
            return res.status(400).send("User not found");
        
        bcrypt.compare(req.body.password, user.password).then(_=>{
            res.send("Correct password");
        }, _=>{
            res.send("Incorrect Password");
        });
    });
});
app.get("/register", (req,res)=>{
    res.render("register");
});
app.post("/register", verifyToken, (req,res)=>{
    users.find({"username": req.body.username}, async (err, [user])=>{
        if(err)
            return res.status(500).send(err);
        else if(user)
            return res.status(400).send("Username already taken");
        
        users.insert({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10),
        });
        jwt.sign({
            username: req.body.username,
        }, process.env.KEY, (err, token)=>{
            console.log(token);
            res.cookie("token", token).redirect("/game");
        });
    })
});
app.listen(80);