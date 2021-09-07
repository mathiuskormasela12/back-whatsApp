// =========== Users Model
// import all modules
import { Model } from 'sequelize'

export default (sequelize: any, DataTypes: any) => {
	class Message extends Model {
		static associate (models: any) {
			// define associaton here
			Message.belongsTo(models.users, {
				foreignKey: 'sender_id',
				targetKey: 'id'
			})

			Message.belongsTo(models.users, {
				foreignKey: 'receiver_id',
				targetKey: 'id'
			})
		}
	}

	Message.init({
		sender_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		receiver_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		message: {
			allowNull: true,
			type: DataTypes.TEXT
		}
	}, {
		sequelize,
		modelName: 'messages'
	})

	return Message
}
