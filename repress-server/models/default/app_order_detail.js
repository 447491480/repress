/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_order_detail', {
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
		order_id: {
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
		patent_id: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		tableName: 'app_order_detail',
		timestamps: false,
		freezeTableName: true
	});
};
