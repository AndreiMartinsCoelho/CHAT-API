var express = require("express");
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const token = require('../util/token');
const salaController = require('../controller/salaController');

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
    const salaController = require("../controller/salaController");
    if(await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) {
        let resp= await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
}));

app.use("/salas/criar", router.post("/salas/criar", async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) return false;
    let resp = await salaController.criarSala(req.body.nome, req.body.tipo, req.body.chave);
    res.status(200).send(resp);
}));

//Rota de entrar no chat

app.use("/entrar",router.post("/entrar", async(req, res, next) => {
    const usuarioController = require("../controller/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

//Rota de entrar na sala

app.use("/sala/entrar", router.put("/sala/entrar", async (req, res)=>{
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp= await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
  }))

//Sair da sala

app.use("/sair", router.post("/sair", async (req, res, next) => {
    const salaController = require("../controller/salaController");
    let resp = await salaController.sairDaSala(req.body.nick); // Chamada ao método sairDaSala no controller de usuário
    res.status(200).send(resp);
}));

//Rota de enviar mensagem no chat 
  
app.use("/sala/mensagem", router.post("/sala/mensagem", async (req, res) => {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp= await salaController.enviarMensagem(req.headers.nick, req.body.msg,req.body.idSala);
    res.status(200).send(resp);
}))

module.exports=app;
