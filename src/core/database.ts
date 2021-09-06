// ========== Database
// import all modules
import appConfig from '../config/appConfig'
import { Sequelize } from 'sequelize'

// import all models
import Users from '../models/Users'

const sequelize = new Sequelize(appConfig.database.database, appConfig.database.user, appConfig.database.password, {
	host: appConfig.database.host,
	dialect: 'postgres',
	port: appConfig.database.port,
	pool: {
		max: appConfig.database.pool.max,
		min: appConfig.database.pool.min,
		acquire: appConfig.database.pool.acquire,
		idle: appConfig.database.pool.idle
	}
})

const database: any = {}

database.Sequelize = Sequelize
database.sequelize = sequelize

database.users = Users(sequelize, Sequelize)

export default database
