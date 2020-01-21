const express = require('express');
const routes = require('./routes');
const path = require('path');
// const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
// const expressValidator = require('express-validator/check');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
// helpers con algunas funciones
const helpers = require('./helpers');
// Crear la conexión a la BD
const db = require('./config/db');
//extraer valores de variables 
require('dotenv').config({ path: 'variables.env' });

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/CONTENEDOR');
require('./models/Usuarios');

db.sync(
        // { force: true }
        // sincronizar la base de datos con los modelos OJO BORRA TODO
    )
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// crear una app de express
const app = express();
// // Donde cargar los archivos estaticos
app.use(express.static('public'));
// // Habilitar Pug
app.set('view engine', 'pug');
// // Añadir la carpeta de las vistas

// habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));

// Agregamos express validator a toda la aplicación
// app.use(expressValidator());

app.set('views', path.join(__dirname, './views'));
// agregar flash messages
app.use(flash());
// sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
// Pasar var dump a la aplicación
app.use((req, res, next) => {
    console.log(req.user);
    res.locals.year = 2019;
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user } || null;
    next();
});

app.use('/', routes());


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

// // luis
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});



// parse application/json
// app.use(bodyParser.json());

// console.log(__dirname);
// app.use(cookieParser());
// // sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
// app.use(session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false
// }));