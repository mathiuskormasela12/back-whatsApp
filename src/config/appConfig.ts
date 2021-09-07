// ========== App Config
import dotenv from 'dotenv'

dotenv.config()

export default {
	port: Number(process.env.PORT || 3000),
	appUrl: String(process.env.APP_URL),
	secretKey: String(process.env.SECRET_KEY),
	clients: [
		'http://localhost:3000',
		'http://127.0.0.1:3000'
	],
	nodeEnv: String(process.env.NODE_ENV || 'development'),
	upload: {
		createParentPath: true
	},
	twilio: {
		account_sid: String(process.env.TWILIO_ACCOUNT_SID),
		account_token: String(process.env.TWILIO_ACCOUNT_TOKEN),
		account_phone_number: String(process.env.TWILIO_PHONE_NUMBER)
	},
	database: {
		host: String(process.env.DB_HOST),
		user: String(process.env.DB_USER),
		password: String(process.env.DB_PASSWORD),
		database: String(process.env.DB_NAME),
		dialect: 'mysql',
		pool: {
			acquire: 30000,
			idle: 10000,
			min: 0,
			max: 5
		}
	}
}
