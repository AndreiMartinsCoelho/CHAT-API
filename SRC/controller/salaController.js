//Controlando a lista de salas do chat 

const salaModel = require('../models/salaModel');

const salaController = {};

salaController.get = async (req, res) => {
  return await salaModel.listarSalas();
}

salaController.entrar = async (iduser, idsala) => {
  const sala = await salaModel.buscarSala(idsala);
  let usuarioModel = require('../models/usuarioModel');
  let user = await usuarioModel.buscarUsuario(iduser);
  user.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo };
  if (await usuarioModel.alterarUsuario(user)) {
    return { msg: "OK", timestamp: timestamp = Date.now() };
  }
  return false;
}

salaController.enviarMensagem = async (nick, msg, idSala) => {
  const sala = await salaModel.buscarSala(idSala);
  if (!sala) {
    // Sala não encontrada
    return { "error": "Sala não encontrada" };
  }

  if (!sala.msgs) {
    // Inicializa msgs como um array vazio
    sala.msgs = [];
  }

  const timestamp = Date.now();
  sala.msgs.push({
    timestamp: timestamp,
    msg: msg,
    nick: nick
  });

  await salaModel.atualizarMensagens(sala);

  return { "msg": "OK", "timestamp": timestamp };
}

salaController.buscarMensagens = async (idsala, timestamp) => {
  let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
  return {
    "timestamp": mensagens[mensagens.length - 1].timestamp,
    "msgs": mensagens
  };
}

salaController.criarSala=async(nome, tipo, chave) => {
  let sala = {
    nome: nome,
    tipo: tipo
  };

  if (tipo === "privada" && chave) {
    sala.chave = chave;
  }

  return await salaModel.criarSala(sala);
}

salaController.sairDaSala = async (iduser) => {
  let usuarioModel = require('../models/usuarioModel');
  let user = await usuarioModel.buscarUsuario(iduser);
  user.sala = null; // Remover a referência à sala
  if (await usuarioModel.alterarUsuario(user)) {
    return { msg: "OK", timestamp: Date.now() };
  }
  return false;
};

module.exports = salaController;

