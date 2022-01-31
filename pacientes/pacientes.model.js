const db = require('../db');

class Pacientes {
    let model

    constructor (){
        if (process.env.MIGRATE === 'true'){
            const createStatement = 'CREATE TABLE IF NOT EXISTS pacie'
        }
    }
}