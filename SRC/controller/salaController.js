
//Controlando a lista de salas do chat 

const salaModel = require('../model/salaModel');

exports.get=async()=>{
    let salaModel = require('../model/salaModel');
    return salaModel.listarSalas();
}

exports.get=async(req,res)=>{
    return{"status":"OK","controller":"Sala"};
}

exports.get=async()=>{
    return await salaModel.listarSalas();
}