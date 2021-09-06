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
	database: {
		host: String(process.env.DB_HOST),
		user: String(process.env.DB_USER),
		password: String(process.env.DB_PASSWORD),
		database: String(process.env.DB_NAME),
		dialect: 'postgres',
		port: Number(process.env.DB_PORT || 5432),
		pool: {
			acquire: 30000,
			idle: 10000,
			min: 0,
			max: 5
		}
	}
}
