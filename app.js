const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//rutas
const vehiculosRoutes = require('./routes/vehiculos');
const marcasRoutes = require('./routes/marcas');

//Iniciar la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

//Configurar middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Configurar motor de plantilla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Configurar rutas
app.use('/', vehiculosRoutes);
app.use('/api/marcas', marcasRoutes);

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
