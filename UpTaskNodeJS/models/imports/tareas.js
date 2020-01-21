/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tareas', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		tarea: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'tarea'
		},
		estado: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'estado'
		},
		proyectoId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'proyectos',
				key: 'id'
			},
			field: 'proyectoId'
		}
	}, {
		tableName: 'tareas'
	});
};
