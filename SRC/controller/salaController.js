
//Controlando a lista de salas do chat 

const salaModel = require('../models/salaModel');

exports.get = async (req, res) => {
  return await salaModel.listarSalas();
}

exports.get = async (req, res) => {
  return { "status": "OK", "controller": "Sala" };
}
