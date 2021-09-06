// ========== Auth Routes
// import all modules
import { Router } from 'express'
import RoutesModule from '../core/Routes'

// import all controllers
import authControllers from '../controllers/Auth'

namespace AuthRoutesModule {
	export class AuthRoutes extends RoutesModule.Routes {
		constructor () {
			super()
			this.routes()
		}

		public routes (): void {
			this.getRouter.post('/auth/register', authControllers.Auth.register)
		}

		public get authRoutes (): Router {
			return this.getRouter
		}
	}
}

export default new AuthRoutesModule.AuthRoutes()
