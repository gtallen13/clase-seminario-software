const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

function getCurrentDateTime (){
  let today = new Date();
  let date = today.getFullYear() + '-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ':' + today.getMinutes() + ':'+today.getSeconds();
  let dateTime = date + ' '+ time;
  return dateTime;
}
router.get('/', (req, res) => {
  res.status(200).json(
    {
      endpoint: 'Expedientes',
      updates: new Date(2022,0,20,20,00,00)
    }
  );
}); //GET /

router.get('/all', async(req,res)=>{
  try{
    const rows = await expedienteModel.getAll();
    res.status(200).json({status:'ok',expedientes:rows});
  } catch(ex){
    console.log(ex);
    res.status(500).json({status:'failed'});
  }
}); // ALL /

router.get('/byid/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const rows = await expedienteModel.getById(id);
    res.status(200).json({status:'ok',expedientes:rows});
  } catch(ex){
    console.log(ex);
    res.status(500).json({status:'failed'});
  }
}); // byID /

router.post('/new', async(req,res)=>{
  const {identidad, fecha, descripcion, registros} = req.body;
  try{
    rslt = await expedienteModel.new(identidad, fecha, descripcion, registros,getCurrentDateTime());
    res.status(200).json({status:'ok',result:rslt});
  } catch(ex){
    console.log(ex);
    res.status(500).json({status:'failed',result:{}});
  }
}); // NEW /
router.put('/update/:id', async(req,res)=>{
  try{
    const {identidad, fecha, descripcion, registros} = req.body;
    const {id} = req.params;
    const result = await expedienteModel.updateOne(id,identidad, fecha, descripcion, registros,getCurrentDateTime())
    res.status(200).json({status:'ok',result});
  }catch(ex){
    console.log(ex);
    res.status(500).json({status:'failed'})
  }
}) //UPDATE

router.delete('/delete/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const result = await expedienteModel.deleteOne(id)
    res.status(200).json({status:'ok',result});
  }catch(ex){
    console.log(ex);
    res.status(500).json({status:'failed'})
  }
}) //DELETE

module.exports = router;
