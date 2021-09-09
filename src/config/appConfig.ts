// ========== App Config
import dotenv from 'dotenv'

dotenv.config()

const {
	PORT = 3000,
	APP_URL,
	SECRET_KEY,
	NODE_ENV = 'development',
	TWILIO_ACCOUNT_SID,
	TWILIO_ACCOUNT_TOKEN,
	TWILIO_PHONE_NUMBER,
	DB_HOST,
	DB_PORT = 5432,
	DB_USER,
	DB_PASSWORD,
	DB_NAME
} = process.env

export default {
	port: Number(PORT),
	appUrl: String(APP_URL),
	secretKey: String(SECRET_KEY),
	clients: [
		'http://localhost:3000',
		'http://127.0.0.1:3000'
	],
	nodeEnv: String(NODE_ENV),
	upload: {
		createParentPath: true
	},
	twilio: {
		account_sid: String(TWILIO_ACCOUNT_SID),
		account_token: String(TWILIO_ACCOUNT_TOKEN),
		account_phone_number: String(TWILIO_PHONE_NUMBER)
	},
	database: {
		host: String(DB_HOST),
		user: String(DB_USER),
		password: String(DB_PASSWORD),
		database: String(DB_NAME),
		port: Number(DB_PORT),
		pool: {
			acquire: 30000,
			idle: 10000,
			min: 0,
			max: 5
		}
	}
}
