// ====================
//  PUERTO APLICACIÓN
//=====================
process.env.PORT = process.env.PORT || 3000;
/* --------------------------------------------------------- */

// =======================
//  ENTORNO DE EJECUCIÓN
//========================
/* Variable que establece Heroku O tambien lo puedo
aplicar donde este corriendo el proceso de NodeJS */
/* Si existe algo lo estoy corriendo en producción */
/* Si el NODE_ENV no existe entonces voy estoy en desarrollo */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
/* --------------------------------------------------------- */

// ================================
//  CONECTANDO A LA BASE DE DATOS
//=================================
let urlBaseDatos;

if (process.env.NODE_ENV === 'dev') {
    urlBaseDatos = 'mongodb://localhost/chat';
} else {
    urlBaseDatos = 'mongodb+srv://DanielFernandoYepezVelez:SsFjmPowOMhf4tJ1@cluster0-iw8eb.mongodb.net/chat'
}
/* --------------------------------------------------------- */

// ============================================================
//  INVENTANDO UN PROCESO PARA EXPORTAR LA URL EN EL PROYECTO
//=============================================================
/* Recordar que la palabra process existe en todo el proyecto
por ende no tengo que utilizar el module.exports */
process.env.URLBD = urlBaseDatos;
/* --------------------------------------------------------- */