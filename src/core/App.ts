// ========== Application
// import all modules
import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import upload from 'express-fileupload'
import http from 'http'
import path from 'path'
import database from './database'
import bootstraping from '../helpers/bootstrap'
import socket from '../middlewares/socket'

// import configurations
import appConfig from '../config/appConfig'
import IApp from '../config/IApp'

namespace AppModule {
	export class App implements IApp {
		public app: Application
		public port: number

		constructor () {
			this.app = express()
			this.port = appConfig.port

			this.startup()
		}

		protected async startup (): Promise<void> {
			// setup express-fileupload
			this.app.use(upload(appConfig.upload))

			// setup socket.io
			const server: any = http.createServer(this.app)
			const io: any = require('socket.io')(server, {
				origin: appConfig.clients.map((origin: any) => ({ origin }))
			})

			io.on('connection', () => {
				console.log('a user has connected')
			})

			this.app.use(socket(io))

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

			database.sequelize.sync({
				force: false
			})

			try {
				const routes: any = await bootstraping('../routes')
				routes.forEach((route: any) => {
					this.app.use('/api/v1', route.default.routers)
				})
			} catch (err: any) {
				console.log(err)
			}
		}

		public listen (): void {
			this.app.listen(this.port, () => {
				console.log(`Application runing at ${appConfig.appUrl}`)
			})
		}
	}
}

export default AppModule
