/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_cponline_user', {
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
		sub_id: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		sub_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		sub_identity_card: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		app_user_id: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		tableName: 'app_cponline_user',
		timestamps: false,
		freezeTableName: true
	});
};
