var express = require("express");
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Rota padrão

const router = express.Router();
app.use('/',router.get ('/',(req, res)=>{
    res.status(200).send("<h1>API - CHAT</h1>")
}));

//Rota com o nome do propretario e a sua versão

app.use("/",router.get("/sobre",(req, res, next)=>{
    res.status(200).send({
        "nome":"API - Chat",
        "versão":"0.1.0",
        "autor":"Andrei Martins"
    })
}));

//Rota de Lista de salas do chat

app.use("/salas",router.get("/salas",(req, res, next) => {
    const salaController = require("../controllers/usuarioControllers");
    let resp=salaController.get();
    res.status(200).send(resp);
}));

//Rota de entrar no chat

app.use("/entrar",router.post("/entrar", async(req, res, next) => {
    const usuarioController = require("../controllers/usuarioControllers");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

module.exports=app;