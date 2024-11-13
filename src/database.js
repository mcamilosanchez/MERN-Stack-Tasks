/**
 * En este archivo, importamos mongoose, ya que nos vamos a conectar a nuestra base de datos. Si la base de datos es local, 
 * debemos instalar en nuestro ordenador MongoDB. Después de haberlo instalado, debemos inicializarlo ya sea adentro de este
 * proyecto o por fuera mediante la terminal. 
 */

const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-tasks';

mongoose.connect(URI)
    .then(db => console.log('DB IS CONNECTED'))
    .catch(error => console.error(error));

/**
 * Luego, debemos exportarlo para poder implementarlo en index.js
 */

module.exports = mongoose;
