const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async(req, res) => {
  try{
    const [marcas] = await db.query('SELECT * FROM marcas');
    res.json(marcas);
  }catch(error){
    console.error('No se pueden obtener las marcas: ', error);
  }
})

module.exports = router;