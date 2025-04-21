const express = require('express');
const router = express.Router();
const db = require('../config/database');

//Obtener todos los vehículos
router.get('/', async (req, res) => {
  try{
    const query = `
    SELECT
      V.id,
        V.tipo,
        M.marca,
        V.color
      FROM vehiculos V 
        INNER JOIN marcas M ON M.id = V.idmarca;
    `;
    const [vehiculos] = await db.query(query);
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
router.get('/create', async (req, res) => {
  try{
    const [marcas] = await db.query('SELECT * FROM marcas');
    res.render('create', { title: 'Agregar vehículo', marcas: marcas })
  }catch(error){
    console.error(error);
  }
});

//Crear nuevo vehículo (INSERT INTO...)
router.post('/create', async (req, res) => {
  try{
    const {tipo, marca, color} = req.body;
    await db.query(`INSERT INTO vehiculos (tipo, idmarca, color) VALUES (?,?,?)`, [tipo, marca, color]);
    res.redirect('/');
  }
  catch(error){
    console.error(`Error al agregar vehículo: ${error}`);
    res.status(500).render('create', {
      title: 'Agregar vehículo',
      message: 'Error al agregar vehículo'
    });
  }
});

//Mostrar formulario para editar vehículo
router.get('/edit/:id', async (req, res) => {
  try{
    const [vehiculo] = await db.query(`SELECT * FROM vehiculos WHERE id = ?`, [req.params.id]);
    const [marcas] = await db.query('SELECT * FROM marcas');

    if (vehiculo.length == 0){
      return res.redirect(`/?message=Vehículo no encontrado`);
    }

    res.render(`edit`, {
      vehiculo: vehiculo[0],
      title: 'Editar vehículo',
      marcas: marcas
    });
  }
  catch(error){
    console.error(`Error al obtener el vehículo: `, error);
    res.status(500).redirect(`/?message=Error al cargar el vehículo`);
  }
});

//Actualizar vehículo (UPDATE)
router.post(`/edit/:id`, async(req, res) => {
  try{
    const {tipo, marca, color} = req.body;
    await db.query(`UPDATE vehiculos SET tipo = ?, idmarca = ?, color = ? WHERE id = ?`, [tipo, marca, color, req.params.id]);
    res.redirect('/?message=Vehículo actualizado correctamente')
  }
  catch(error){
    console.error(`Error al actualizar vehículo:`, error);
    res.status(500).redirect(`/edit/${req.params.id}?message=Error al actualizar le vehículo]`);
  }
});

//Eliminar vehículo
router.get('/delete/:id', async(req, res) => {
  try{
    await db.query(`DELETE FROM vehiculos WHERE id = ?`, [req.params.id]);
    res.redirect(`/?message=Vehíchulo eliminar correctamente`)
  }catch(error){
    console.error('Error al eliminar un vehículo', error);
    res.status(500).redirect('/?message=Error al eliminar el vehículo');
  }
});

module.exports = router;