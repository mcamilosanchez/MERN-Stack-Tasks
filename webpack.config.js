const { path } = require("express/lib/application");

/** Archivo de configuración de Webpack, cuando ejecutemos el comando webpack desde la consola, Webpack buscará este archivo y leerá
 * la configuración de abajo, la cual será un objeto. */
module.exports = {
    /** El archivo de entrada de webpack a convertir, será: */
    entry: './src/app/index.js',
    /** El archivo de salida a convertir, es decir, dónde pondrá el código transformado. Podemos usar la constante __dirname de NodeJS, ya
     * que Webpack, es una herramienta de NodeJS para convertir código. Recordar que __dirname da la ruta inicial del proyecto */
    output: {
        path: __dirname + '/src/public',
        //Ahora le damos el nombre del archivo js convertido
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude:/node_modules/
            }
        ]
    }
};