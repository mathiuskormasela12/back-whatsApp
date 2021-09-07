/* eslint-disable @typescript-eslint/no-unused-vars */
// =========== Users Model
// import all modules
import { Model } from 'sequelize'

export default (sequelize: any, DataTypes: any) => {
	class User extends Model {
		static associate (models: any) {
			// define associaton here
		}
	}

	User.init({
		phone_number: {
			allowNull: false,
			type: DataTypes.STRING(100)
		},
		first_name: {
			allowNull: false,
			type: DataTypes.STRING(100)
		},
		last_name: {
			allowNull: true,
			type: DataTypes.STRING(255)
		},
		photo: {
			allowNull: false,
			type: DataTypes.STRING(255),
			defaultValue: 'nophoto.png'
		},
		status: {
			allowNull: true,
			type: DataTypes.TEXT
		}
	}, {
		sequelize,
		modelName: 'users'
	})

	return User
}
