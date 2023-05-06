var express = require("express");
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();
app.use('/',router.get ('/',(req, res)=>{
    res.status(200).send("<h1>API - CHAT</h1>")
}))

module.exports=app;