/**
 * Ahora, vamos a importar mongoose de nuevo, pero no para inicializar nuestra DB (ya está hecho) sino para crear nuestra
 * estructura de datos. Por lo anterior, solo requerimos una parte de esta biblioteca, que se llama Schema.
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

/**
 * En la siguiente línea, vamos a CREAR, REGISTRAR y EXPORTAR el modelo Task en Mongoose, usando el esquema TaskSchema. 
 * Esto permite que más adelante puedas usar este modelo para realizar operaciones en la colección tasks de la base de 
 * datos, como crear, leer, actualizar y eliminar tareas (Task).
 */

module.exports = mongoose.model('Task', TaskSchema);

