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

//Mostrar formulario para crear vehículo
router.get('/create', (req, res) => {
  res.render('create', { title: 'Agregar vehículo' })
});

//Crear nuevo vehículo (INSERT INTO...)
router.post('/create', async (req, res) => {
  try{
    const {tipo, marca, color} = req.body;
    await db.query(`INSERT INTO vehiculos (tipo, marca, color) VALUES (?,?,?)`, [tipo, marca, color]);
    res.redirect('/?message=Vehículo registrado correctamente');
  }
  catch(error){
    console.error(`Error al agregar vehículo: ${error}`);
    res.status(500).render('create', {
      title: 'Agregar vehículo',
      message: 'Error al agregar vehículo'
    });
  }
});

module.exports = router;