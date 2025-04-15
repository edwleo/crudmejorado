const express = require('express');
const router = express.Router();
const db = require('../config/database');

//Obtener todos los vehículos
router.get('/', async (req, res) => {
  try{
    const [vehiculos] = await db.query(`SELECT * FROM vehiculos`);
    res.render('index', {
      vehiculos,
      title: 'Lista de vehículos',
      message: req.query.message || null
    });
   res.json(vehiculos);
  }
  catch(error){
    console.error('Error al obtener vehículos: ', error);
    res.status(500).render('index', {
      vehiculos: [],
      title: 'Lista de vehículos',
      message: 'Error al cargar los vehículos'
    });
  }
});

module.exports = router;