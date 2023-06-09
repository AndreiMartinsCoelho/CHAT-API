//Conexão ao Mongo GB

const {MongoClient, ObjectId}=require("mongodb");

let singleton;

async function connect()
{
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

async function findAll(collection){
    const db = await connect();
    return db.collection(collection).findAll().toArray();
}

async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

let findOne = async (collection, _id) => {
    if (typeof _id !== 'string' || _id.length !== 24) {
      return false; // ou lançar um erro apropriado
    }
  
    const db = await connect();
    let obj = await db.collection(collection).find({ '_id': new ObjectId(_id) }).toArray();
    if (obj) {
      return obj[0];
    }
    return false;
  }
  
  
  let updateOne = async (collection, object, param) => {
    if (typeof param !== 'object' || Object.keys(param).length === 0) {
      console.log('Parameter must be a valid JavaScript object');
    }
  
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, { $set: { field: false } });
    return result;
  }
  
module.exports = { findAll, findOne, updateOne, insertOne };