const db = require("./db");

async function listarSalas() {
  let salas = await db.findAll("salas");

  return salas;
}

async function criarSala(nome, tipo, chave) {
    let sala = {
      nome: nome,
      tipo: tipo
    };
  
    if (tipo === "privada" && chave) {
      sala.chave = chave;
    }
  
    return await db.insertOne("salas", sala);
  }

  async function entrarNaSala(idUser, idSala) {
    const sala = await db.findOne("salas", idSala);
    if (!sala) {
      return false; // Sala não encontrada
    }
  
    const usuario = await db.findOne("usuarios", idUser);
    if (!usuario) {
      return false; // Usuário não encontrado
    }
  
    usuario.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo };
  
    const result = await db.updateOne("usuarios", usuario, { _id: usuario._id });
    return result.modifiedCount > 0;
  }

async function buscarSala(idsala) {
  let sala = await db.findOne("salas", { _id: idsala });
  return sala;
}

async function atualizarMensagens(sala) {
    const { _id, msgs } = sala;
    return await db.updateOne("salas", { _id: _id }, { $set: { msgs: msgs } });
  }

module.exports = { listarSalas, buscarSala, atualizarMensagens, criarSala, entrarNaSala};
