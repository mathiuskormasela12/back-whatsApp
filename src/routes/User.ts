// ========== User Routes
// import all modules
import { Router } from 'express'
import RoutesModule from '../core/Routes'

// import all middlewares
import { isLogin } from '../middlewares/auth'
import { checkEditUsernameForm } from '../middlewares/user'

// import all controllers
import userControllers from '../controllers/User'

namespace UserRoutesModule {
	export class UserRoutes extends RoutesModule.Routes {
		constructor () {
			super()
			this.routes()
		}

		public routes (): void {
			this.getRouter.patch('/user/name/:id', isLogin, checkEditUsernameForm, userControllers.User.editUsername)
		}

		public get routers (): Router {
			return this.getRouter
		}
	}
}

export default new UserRoutesModule.UserRoutes()
