// =========== Auth Controlers
// import all modules
import { Request, Response } from 'express'
import response from '../helpers/response'

namespace ChatControllerModule {
	export class Chat {
		public static send (req: Request, res: Response): Response {
			return response(req, res, 200, 'This is send message endpoint', true)
		}
	}
}

export default ChatControllerModule
