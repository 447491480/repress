/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_user', {
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
		account: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		language: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		tableName: 'app_user',
		timestamps: false,
		freezeTableName: true
	});
};
