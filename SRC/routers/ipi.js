app.use("/", router.get("/", (req,res, next)=>{
    res.status(200).send("<h1>API - Chat</h1>");
}));

app.use("/",router.get("/sobre",(req, res, next)=>{
    res.status(200).send({
        "nome":"API - Chat",
        "versão":"0.1.0",
        "autor":"Andrei Martins"
    })
}));

module.exports=app;