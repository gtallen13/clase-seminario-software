const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');

let db = null;
class Pacientes {
  collection = null;
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Pacientes');
        if (process.env.MIGRATE === 'true') {
          // Por Si se ocupa algo
        }
      })
      .catch((err) => { console.error(err) });
  }

  async new(nombres, apellidos, identidad, telefono, correo) {
    const newPaciente = {
      nombres,
      apellidos,
      identidad,
      telefono,
      correo
    };
    const rslt = await this.collection.insertOne(newPaciente);
    return rslt;
  }

  async getAll() {
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }

  async getById(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    console.log(filter);
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
  }

  async updateOne(id, nombres, apellidos, identidad, telefono, correo) {
    const filter = {_id: new ObjectId(id)};
    // UPDATE PACIENTES SET campo=valor, campo=valor where id= id;
    const updateCmd = {
      '$set':{
        nombres,
        apellidos,
        identidad,
        telefono,
        correo
      }
    };
    return await this.collection.updateOne(filter, updateCmd);
  }

  async deleteOne(id) {
    const filter = {_id:new ObjectId(id)};
    const deleteCmd = await this.collection.deleteOne(filter)
    return deleteCmd;
  }
}

module.exports = Pacientes;
