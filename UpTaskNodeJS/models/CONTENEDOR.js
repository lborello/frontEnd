/* jshint indent: 1 */
// const Sequelize = require('sequelize');
// const db = require('../config/db');
// const Proyectos = require('./Proyectos');

// const Tareas = db.define('tareas', {
//     id: {
//         type: Sequelize.INTEGER(11),
//         primaryKey: true,
//         autoIncrement: true
//     }, 
//     tarea: Sequelize.STRING(100),
//     estado: Sequelize.INTEGER(1)
// });
// Tareas.belongsTo(Proyectos);

// module.exports = Tareas;
const Sequelize = require('sequelize');
const db = require('../config/db');
const Contenedor = db.define('contenedor', {
    idContenedor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        field: 'ID_CONTENEDOR'
    },
    fkCajas: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'FK_CAJAS'
    },
    estanteria: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'ESTANTERIA'
    },
    horizontal: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'HORIZONTAL'
    },
    vertical: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'VERTICAL'
    },
    adelanteAtras: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'ADELANTE_ATRAS'
    },
    nroEstante: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'NRO_ESTANTE'
    },
    estado: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'ESTADO'
    },
    codCliente: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'COD_CLIENTE'
    },
    nroCaja: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'NRO_CAJA'
    },
    nroRemito: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'NRO_REMITO'
    },
    fModificacion: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'F_MODIFICACION'
    },
    idrequerimiento: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'IDREQUERIMIENTO'
    },
    nueva: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'NUEVA'
    },
    baja: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'BAJA'
    },
    ubProvisoria: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'UB_PROVISORIA'
    },
    codCaja: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'COD_CAJA'
    },
    jeraquia: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'JERAQUIA'
    },
    codIndice: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'COD_INDICE'
    },
    codClienteUsuario: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'COD_CLIENTE_USUARIO'
    },
    codResponsablePosicion: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'COD_RESPONSABLE_POSICION'
    },
    fechaCreacion: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'FECHA_CREACION'
    },
    moduloV: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'MODULO_V'
    },
    moduloH: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'MODULO_H'
    },
    control: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'CONTROL'
    },
    modulo: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'MODULO'
    },
    codRemitoGuarda: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'COD_REMITO_GUARDA'
    },
    codUsuarioClienteGuarda: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'COD_USUARIO_CLIENTE_GUARDA'
    },
    codIndiceSector: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'COD_INDICE_SECTOR'
    },
    orden: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'ORDEN'
    },
    fechaposicion: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'FECHAPOSICION'
    },
    fechabloque: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'FECHABLOQUE'
    },
    codClienteError: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'COD_CLIENTE_ERROR'
    },
    nroCajaError: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'NRO_CAJA_ERROR'
    }
}, {
    tableName: 'CONTENEDOR'
});
module.exports = Contenedor;