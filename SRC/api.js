var express = require("express");
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const token = require('./util/token');

//Rota padrão

const router = express.Router();

app.use('/',router.get ('/', async (req, res)=>{
    res.status(200).send("<h1>API - CHAT</h1>")
}));

//Rota com o nome do propretario e a sua versão

app.use("/sobre",router.get("/sobre", async (req, res, next)=>{
    res.status(200).send({
        "nome":"API - Chat",
        "versão":"0.1.0",
        "autor":"Andrei Martins"
    })
}));

//Rota de Lista de salas do chat

app.use("/salas",router.get("/salas", async (req, res, next) => {
    const salaController = require("./controller/salaController");
    if(await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) {
        let resp= await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
}));

//Rota de entrar no chat

app.use("/entrar",router.post("/entrar", async(req, res, next) => {
    const usuarioController = require("./controller/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/sala/entrar", router.put("/sala/entrar", async (req, res)=>{
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) 
    return false;
    let resp= await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
  }))
  

module.exports=app;
