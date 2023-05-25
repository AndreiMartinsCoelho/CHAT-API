
//Requerimento do MongoDB

const db = require("./db");
function listarSalas(){
    return db.findAll("salas");
}

//Lista das salas

function listarSalas(){
    return[
        {
            "_id":{
                "$oid":"5435b4343h543b43nh"
            },
            "nome":"Fãs do Tio Phill XBOX",
            "tipo":"publica"
        },
        {
            "_id":{
                "$oid":"8787787878mn87k87"
            },
            "nome":"Cancelados do Twitter",
            "tipo":"privada",
            "chave":"AT879021W"
        },
        {
            "_id":{
                "$oid":"2123224334mwqwq"
            },
            "nome":"Hospicio da EA e UBI",
            "tipo":"publica"
        }
    ];
}

module.exports = {listarSalas};
