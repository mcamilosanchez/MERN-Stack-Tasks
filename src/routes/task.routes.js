// We will use express here not to create another server, but to create ROUTES
const express = require('express');
const router = express.Router(); // Object that helps to enter routes


/** Nuestro modelo de datos se encontrará almacenado en Task para así poder realizar consultas a nuestra base de datos. */
const Task = require('../models/task');
const task = require('../models/task');


//Now we can define routes on our server, in this case, we will create the initial route('/' means initial route).

/** Este código define una ruta HTTP GET en Express para un servidor Node.js que responde en el endpoint raíz ('/'). 
 * router.get('/', async (req, res) => { ... }): router.get define una ruta HTTP de tipo GET. Esto significa que cuando 
 * el servidor recibe una solicitud GET en la URL especificada ('/'), ejecutará la función de manejo (callback) 
 * proporcionada. Async es una función asíncrona que toma dos parámetros: req (REQUEST) y res (RESPONSE) */
router.get('/', async (req, res) => {

    /** await se usa para esperar la resolución de una operación asíncrona. Aquí, await Task.find() indica que el código 
     * espera a que Task.find() termine antes de continuar. 
     * Task.find() es un método de Mongoose que busca todos los documentos en la colección Task de MongoDB. En este caso, 
     * se espera que Task.find() devuelva una LISTA DE TASKS almacenadas en la base de datos.
     * tasks es una constante que almacena el resultado de Task.find() (es decir, la lista de tareas encontradas en la 
     * base de datos).*/
    const tasks = await Task.find();
    // Enviamos la respuesta en formato JSON al cliente.
    res.json(tasks);
    
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Ahora, vamos a definir una ruta en el servidor para manejar solicitudes POST a la raíz (/) de este router. Esa línea 
 * configura una ruta que escucha solicitudes POST en la ruta base /. 
 * El controlador (función de flecha) se ejecutará cada vez que el servidor reciba una solicitud POST en esta ruta.*/
router.post('/', async (req, res) => {
    /** Aquí, req.body representa el cuerpo de la solicitud, que es donde normalmente se envían los datos en una 
     * solicitud POST. Recordar que gracias a app.use(express.json()); (en el fichero index .js) nuestro servidor 
     * puede entender el formato json y así poder acceder al BODY.
     * Luego, se están extrayendo (desestructurando) los valores (const) de title y description del objeto req.body, que 
     * contiene los datos enviados en la solicitud POST */
    const { title, description } = req.body;
    /** Aquí, se crea una nueva instancia del modelo Task utilizando mongoose. Este modelo representa un documento 
     * en la colección de tareas en MongoDB. Al pasar { title, description } en el constructor, se configura esta 
     * nueva tarea con el título y la descripción proporcionados en el cuerpo de la solicitud. */
    const task = new Task({title, description});
    /** Esta línea guarda la nueva tarea en la base de datos de MongoDB. Como task.save() es una operación asincrónica, 
     * se utiliza await para esperar a que termine antes de continuar. Al final de esta línea, la tarea se habrá guardado 
     * correctamente en la base de datos. */
    await task.save();
    /** Después de guardar la tarea, se envía una respuesta en formato JSON al cliente con un mensaje que indica que la 
     * tarea ha sido guardada exitosamente. Esto es útil para que el cliente confirme que su solicitud fue exitosa. */
    res.json({status: 'Task Saved'});

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Luego, vamos a ACTUALIZAR nuestro task, por medio del método PUT. La ruta acepta una solicitud PUT en la URL /:id. 
 * La :id representa el identificador único de la tarea que queremos actualizar. Este id viene en la URL, por ejemplo: 
 * /tasks/12345, donde 12345 es el id de la tarea. */
router.put('/:id', async (req, res) => {
    /** Aquí se están extrayendo (desestructurando) los valores de title y description del objeto req.body, el cual 
     * contiene los datos enviados en la solicitud.  */
    const { title, description } = req.body;
    /** Se crea un objeto NewTask con los datos title y description que queremos actualizar. Este objeto será utilizado 
     * en el siguiente paso para modificar la tarea en la base de datos. */
    const NewTask = { title, description };
    /** Aquí se utiliza el método findByIdAndUpdate de Mongoose para buscar y actualizar una tarea en la base de datos. 
     * req.params.id contiene el id extraído de la URL, y NewTask es el objeto con los datos nuevos. Este método 
     * actualiza el documento de tarea con los nuevos valores title y description. */
    await Task.findByIdAndUpdate(req.params.id, NewTask);
    res.json({status: 'Task Updated'});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Por otro lado, vamos a crear otro servicio para buscar tasks por medio de su id */
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Por último, vamos a eliminar una tarea */
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({status: 'Task Deleted'});
});

module.exports = router;