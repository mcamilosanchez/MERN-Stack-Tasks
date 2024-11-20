/** Este archivo será un complemento para index.js y aún seguimos trabajando con React */

import React, { Component } from "react";

class App extends Component {

    /** Vamos a crear el estado de nuestra app */
    constructor() {
        //Usamos super() para heredar todos los componentes que nos ofrece React
        super();
        /** Ahora, vamos a emplear dos estados, para cada campo de texto. Esto quiere decir que cuando la aplicación inicie,
         * estos datos (title y description) estarán en blanco. */
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
        /** En el siguiente condicional existirán dos casos, SI hay algo en el id, es por que vamos a modificarlo, si NO es porque vamos a 
         * crear uno nuevo */
        if (this.state._id) {
            //Vamos a editar la tarea
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })//Cuando responda el servidor, vas a hacer lo siguiente (.then) y si hay un error (catch) se captura y haz esto...
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //Gracias a Materialized podemos realizar un toast, por eso usamos la letra global M
                M.toast({ html: 'Task Update' });
                 /** Vamos a limpiar los datos del formulario de nuevo, el ID también para luego verificar en el condicional anterior si 
                  * vamos a editar o crear */ 
                this.setState({title: '', description: '', _id: ''});
                this.fetchTasks();
            });

        } else {
            //Como ID está vacío, vamos a crear una tarea nueva
            //Recordar que fetch sirve para enviar una petición http a nuestro servidor
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                }//Cuando responda el servidor, vas a hacer lo siguiente (.then) y si hay un error (catch) se captura y haz esto...
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    //Gracias a Materialized podemos realizar un toast, por eso usamos la letra global M
                    M.toast({ html: 'Task Saved' });
                    //Luego, vamos a limpiar nuestro formulario
                    this.setState({title: '', description: ''});
                    //Por último, debemos actualizar la tabla de la lista de tareas para que aparezca la nueva tarea.
                    this.fetchTasks();
                    
                })
                .catch(error => console.log(error));
        }
        

        e.preventDefault();
    }

    /** Para listar las tareas previamente guardadas, vamos a usar componentDidMount. Es un método del ciclo de vida de los componentes de clase en React. 
     * Se ejecuta automáticamente después de que un componente se ha montado en el DOM por primera vez. Esto significa que ocurre justo después 
     * de que el componente y su estructura se han renderizado y agregado al árbol del DOM. componentDidMount tiene tres propósitos: 
     *          1. Inicializar lógica después de la renderización inicial
     *          2. Obtener datos externos
     *          3. Suscribir eventos
     *  */
    componentDidMount() {
        console.log('El componente fué montado');
        this.fetchTasks();
    }

    /** La siguiente función realiza una petición GET para traer las tareas alamacenadas en la DB */
    fetchTasks() {
        /** Si solamente escribimos fetch, esta función por defecto realizará un método GET, no como en la petición anterior (POST), donde debíamos 
         * crear más de un parámetro. */
        fetch('/api/tasks') //Cuando envío la petición, voy a obtener una respuesta que se almacenará en .then
        .then(response => response.json())
        .then(data => {
            this.setState({tasks: data});
            console.log(this.state.tasks);
        });
    }

    deleteTask(id) {
        if (confirm('¿Are you sure to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            //Después de esto, recibiré una respuesta del servidor
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //Gracias a Materialized podemos realizar un toast, por eso usamos la letra global M
                M.toast({ html: 'Task Deleted' });
                //Por último, debemos actualizar la tabla de la lista de tareas (ya no estará la lista eliminada).
                this.fetchTasks();
            });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)//Después de esto, recibiré una respuesta del servidor
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                title: data.title,
                description: data.description,
                //Aquí abajo agregamos el ID para identificar que vamos a editar la tarea
                _id: data._id
            })
        })
    } 

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
    
    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description" value={this.state.description} 
                                                className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={() => this.editTask(task._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App