const Sequelize = require('sequelize');
// Option 1: Conexta a mysql  "mysql2": "^2.1.0",
//extraer valores de variables 
require('dotenv').config({ path: 'variables.env' });
const db = new Sequelize(
    process.env.BD_NOMBRE,
    process.env.BD_USER,
    process.env.BD_PASS, {
        host: process.env.BD_HOST,
        dialect: 'mysql',
        port: process.env.BD_PORT,
        logging: false, // Comentarios en consola de sql
        // operatorsAliases: false,
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

// // Option local: Conexta a mysql  "mysql2": "^2.1.0",
// const db = new Sequelize('uptasknode', 'root', '', {
//     host: '127.0.0.1',
//     dialect: 'mysql',
//     port: '3306',
//     logging: false, // Comentarios en consola de sql
//     // operatorsAliases: false,
//     define: {
//         timestamps: false
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });


// Option 2: Conexta a Sql Server "tedious": "^8.0.1"  

// var db = new Sequelize('uptasknode', 'sa', 'Sicuyo123', {
//     host: '222.15.19.127',
//     dialect: 'mssql',
//     port: '1433',
//     logging: false, // Comentarios en consola
//     operatorsAliases: false,
//     define: {
//         timestamps: false
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });


module.exports = db;