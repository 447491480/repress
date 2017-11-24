/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_patents', {
		id: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		create_time: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		apply_type: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		elec_doc_id: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		inner_id: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		create_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		}
	}, {
		tableName: 'app_patents',
		timestamps: false,
		freezeTableName: true
	});
};
