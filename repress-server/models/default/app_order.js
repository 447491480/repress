/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_order', {
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
		user_id: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		payment: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		discount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		tableName: 'app_order',
		timestamps: false,
		freezeTableName: true
	});
};
