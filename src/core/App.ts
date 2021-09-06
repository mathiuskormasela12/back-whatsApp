// ========== Application
// import all modules
import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import path from 'path'
import database from './database'

// import configurations
import appConfig from '../config/appConfig'
import IApp from '../config/IApp'

// import all routes
import authRoutes from '../routes/Auth'

namespace AppModule {
	export class App implements IApp {
		public app: Application
		public port: number

		constructor () {
			this.app = express()
			this.port = appConfig.port

			this.startup()
		}

		protected startup (): void {
			// setup several middlewares
			this.app.use(compression())
			this.app.use(helmet())
			this.app.use(morgan('dev'))

			// setup static files
			this.app.use(express.static(path.join(__dirname, '../../public')))

			// setup url encoded and json
			this.app.use(express.urlencoded({ extended: false }))
			this.app.use(express.json())

			// setup cors
			const corsOptions: any = {
				origin: function (origin: any, callback: any) {
					if (appConfig.clients.indexOf(origin) !== -1 || !origin) {
						callback(null, true)
					} else {
						callback(new Error('Blocked by cors'))
					}
				}
			}

			this.app.use(cors(corsOptions))

			database.users.sync()

			this.app.use('/api/v1', authRoutes.authRoutes)
		}

		public listen (): void {
			this.app.listen(this.port, () => {
				console.log(`Application runing at ${appConfig.appUrl}`)
			})
		}
	}
}

export default AppModule
