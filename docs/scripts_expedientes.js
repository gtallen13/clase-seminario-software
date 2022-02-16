const getDb = require("../dao/mongodb")


const names =[
    'Anoush',
    'Kyveli',
    'Paraskevas',
    'Ermingard',
    'Riacán',
    'Dayaram',
    'Azariah',
    'Filomena',
    'Zuzana',
    'Aleksandrina',
]

const surnames = [
    'Riber',
    'Sobol',
    'Cervantes',
    'Noguera',
    'Scully',
    'Shaw',
    'Norwood',
    'McKinney',
    'Hutchinson',
    'Barsamian',
]

const pacientes = 20;
const pacientesArr = [];

for (let i = 0; i < pacientes;i++){
    const year = ((new Date().getTime() %2) == 0) ? 1980 + Math.floor(Math.random()*20) :2000 + Math.floor(Math.random()*23)
    const secuencia = ('00000'+ Math.ceil(Math.random()*99999).substring(0,-5));
    const nombres = names[Math.floor(Math.random()*9)];
    const apellidos = surnames[Math.floor(Math.random()*9)]
    const correo = (`${nombres}.${apellidos}@example.com`).toLowerCase();
    const telefono = `${(20000000) + Math.floor(Math.random()*10000000)}`;
    const doc = {
        nombres,
        apellidos,
        identidad:`0101${year}${secuencia}`,
        telefono,
        correo
    }
    pacientes.push(doc);
}

getDb.then(
    (db)=>{
        
    }
)