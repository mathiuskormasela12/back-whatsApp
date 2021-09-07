// ========== Auth Routes
// import all modules
import { Router } from 'express'
import RoutesModule from '../core/Routes'

// import all controllers
import authControllers from '../controllers/Auth'

// import all middlewares
import {
	checkAuthForms
} from '../middlewares/auth'

namespace AuthRoutesModule {
	export class AuthRoutes extends RoutesModule.Routes {
		constructor () {
			super()
			this.routes()
		}

		public routes (): void {
			this.getRouter.post('/auth', checkAuthForms, authControllers.Auth.login)
		}

		public get routers (): Router {
			return this.getRouter
		}
	}
}

export default new AuthRoutesModule.AuthRoutes()
