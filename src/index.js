/* This will be the Express file (NodeJS actually), which will allow us to create and initialize our server.
That is, thanks to this file we will initialize our server. */

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

/* Our server will be divided into 4 sections: Settings, Middlewares, Routes and Static Files */

///////////////////////////////////////////////////// Settings /////////////////////////////////////////////////////

/* Ensures that the application runs on the appropriate port based on the environment. On a production server, it 
 * will use the port specified by process.env.PORT, and in a local development environment, it will use port 3000. */
app.set('port', process.env.PORT || 3000); 

///////////////////////////////////////////////////// Middlewares /////////////////////////////////////////////////////
app.use(morgan('dev'));
app.use(express.json());
//////////////////////////////////////////////////////// Routes ///////////////////////////////////////////////////////
app.use('/api/tasks' ,require('./routes/task.routes'));
/////////////////////////////////////////////////////// Static Files //////////////////////////////////////////////////
/* Here, we are entering the location of the public folder where our file that we want to view is located 
 * (index.html), thanks to the PATH module that is responsible for joining (join) the current address (__dirname) 
 * with the PUBLIC folder. */ 
app.use(express.static(path.join(__dirname, 'public')));

/* STARTING THE SERVER */ 
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`); 
});
 