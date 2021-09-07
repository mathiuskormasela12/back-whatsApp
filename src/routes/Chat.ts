// ========== Auth Routes
// import all modules
import { Router } from 'express'
import RoutesModule from '../core/Routes'

// import all controllers
import chatControllers from '../controllers/Chat'

namespace ChatRoutesModule {
	export class ChatRoutes extends RoutesModule.Routes {
		constructor () {
			super()
			this.routes()
		}

		public routes (): void {
			this.getRouter.post('/chat', chatControllers.Chat.send)
		}

		public get routers (): Router {
			return this.getRouter
		}
	}
}

export default new ChatRoutesModule.ChatRoutes()
