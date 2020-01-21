// import { Sequelize } from "sequelize/types";
// import { db } from "../config/db";




const Sequelize = require('sequelize');
const db = require('../config/db');

const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100),
    apellido: Sequelize.STRING()
}, {
    hooks: {
        beforeCreate(proyecto) {
            // console.log("ANtes" + proyecto.nombre);
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`;
            // proyecto.url = url;
        }
    }
});

module.exports = Proyectos;