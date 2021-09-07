// =========== Users Model
// import all modules
import { Model } from 'sequelize'

export default (sequelize: any, DataTypes: any) => {
	class Message extends Model {
		static associate (models: any) {
			// define associaton here
			Message.belongsTo(models.users, {
				targetKey: 'id'
			})

			Message.belongsTo(models.users, {
				targetKey: 'id'
			})
		}
	}

	Message.init({
		sender_id: {
			allowNull: false,
			type: DataTypes.STRING(100)
		},
		receiver_id: {
			allowNull: false,
			type: DataTypes.STRING(100)
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
