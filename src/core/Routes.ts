// ========== Routes
// import all modules
import { Router } from 'express'

// import all interfaces
import IRoutes from '../config/IRoutes'

namespace RoutesModule {
	export abstract class Routes implements IRoutes {
		private router: Router

		public abstract routes(): void

		constructor () {
			this.router = Router()
		}

		protected get getRouter (): Router {
			return this.router
		}
	}
}

export default RoutesModule
