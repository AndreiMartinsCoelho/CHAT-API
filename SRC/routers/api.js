var express = require("express");
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();
app.use('/',router.get ('/',(req, res)=>{
    res.status(200).send("<h1>API - CHAT</h1>")
}));

//nome do propretario e a sua versão

app.use("/",router.get("/sobre",(req, res, next)=>{
    res.status(200).send({
        "nome":"API - Chat",
        "versão":"0.1.0",
        "autor":"Andrei Martins"
    })
}));

//Lista de salas do chat

app.use("/salas",router.get("/salas",(req, res, next) => {
    const salaController = require("../controllers/salaControllers");
    let resp=salaController.get();
    res.status(200).send(resp);
}));

module.exports=app;
