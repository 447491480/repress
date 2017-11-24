/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_video_share', {
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
		link: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		link_des: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'app_video_share',
		timestamps: false,
		freezeTableName: true
	});
};
