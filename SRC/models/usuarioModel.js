const db = require("./db");
async function entrar(nick){
    return await db.insertOne("usuario",{"nick": nick});
}

module.exports = {entrar}