/* eslint-disable @typescript-eslint/no-var-requires */
// ========== Database
// import all modules
import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import appConfig from '../config/appConfig'

namespace DatabaseModule {
	export class Database {
		private sequelize: any;
		private db: any = {}
		private readonly basename: any = path.basename(__filename)

		constructor () {
			this.sequelize = new Sequelize(appConfig.database.database, appConfig.database.user, appConfig.database.password, {
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
		}

		public get database (): any {
			fs
				.readdirSync(path.join(__dirname, '../models'))
				.filter(file => {
					return (file.indexOf('.') !== 0) && (file !== this.basename) && (file.slice(-3) === `${(appConfig.nodeEnv === 'development' ? '.ts' : '.js')}`)
				})
				.forEach((file: any): void => {
					let model: any = require(path.join(__dirname, `../models/${file}`))
					model = model.default(this.sequelize, Sequelize)
					this.db[model.name] = model
				})

			Object.keys(this.db).forEach((modelName: string) => {
				if (this.db[modelName].associate) {
					this.db[modelName].associate(this.db)
				}
			})

			this.db.sequelize = this.sequelize
			this.db.Sequelize = Sequelize

			return this.db
		}
	}
}

export default new DatabaseModule.Database().database
