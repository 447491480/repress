/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin_sys_log', {
		create_time: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		log_type: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		log_content: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'admin_sys_log',
		timestamps: false,
		freezeTableName: true
	});
};
