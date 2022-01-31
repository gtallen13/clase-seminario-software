const getDB = require('../db');
let db = null;
class Expedientes{
    constructor(){
        getDB()
        .then((database)=>{
            db = database;
            if (process.env.MIGRATE === 'true'){
                const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha DATETIME, descripcion TEXT, registros INT, ultimaActualizacion DATETIME);';
                db.run(createStatement);
            }
        }).catch((err)=>{
            console.error(err);
        })
    } // CREATE DB

    new (identidad, fecha, descripcion, registros,ultimaActualizacion){
        return new Promise((accept, reject)=>{
            db.run('INSERT INTO expedientes (identidad, fecha, descripcion, registros, ultimaActualizacion) VALUES (?,?,?,?,?);',[identidad, fecha, descripcion, registros,ultimaActualizacion],(err,rslt)=>{
                if (err){
                    console.error(err);
                    reject(err);
                }
                accept(rslt);
            });
        });
    } // NEW
    getAll(){
        return new Promise((accept,reject)=>{
            db.all('SELECT * FROM expedientes;',(err,rows)=>{
                if(err){
                    console.error(err);
                    reject(err);
                } else{
                    accept(rows);
                }
            })
        })
    } // GET ALL
    getById(id){
        return new Promise((accept, reject)=>{
            db.get('SELECT * from expedientes WHERE id = ?;',[id],(err,row)=>{
                if(err){
                    console.error(err);
                    reject(error)
                } else{
                    accept(row)
                }
            })
        })
    } // GET by ID
    updateOne (id, identidad, fecha, descripcion, registros,ultimaActualizacion){
        return new Promise(
            (accept,reject)=>{
                const sqlUpdate = 'UPDATE expedientes SET identidad = ?, fecha = ?, descripcion = ?, registros = ?, ultimaActualizacion = ? WHERE id = ?;';
                db.run(sqlUpdate,[identidad, fecha, descripcion, registros,ultimaActualizacion,id],
                function(err){
                    if(err){
                        reject(err);
                    } else {
                        accept(this);
                    }
                });
            }
        );
    }// UPDATE 1
    deleteOne(id){
        return new Promise(
            (accept,reject)=>{
                const sqlDelete = 'DELETE FROM expedientes WHERE id = ?';
                db.run(sqlDelete,[id],function(err){
                    if(err){
                        reject(err);
                    }else{
                        accept(this);
                    }
                });
            }
        );
    }

}

module.exports = Expedientes;