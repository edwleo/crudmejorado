const mysql = require('mysql2/promise');

//Crear pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crudnode'
});

async function testConnection(){
  try{
    const connection = await pool.getConnection();
    console.log("Conexion MySQL exitosa");
    connection.release();
  }catch(error){
    console.error("Error al conectarse", error);
  }
}

testConnection();

module.exports = pool;